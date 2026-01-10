import ErrorHandler from "../utils/errorHandler";
import Party from "../models/party";
import PartyTransactions from "../models/partyTransactions";
import PartyBill from "../models/partyBills";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Constants from "../constants";

const fetchPartyTransactionsByPartyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.pagination;
    const { search, startDate, endDate } = req.query;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid Party ID", StatusCodes.BAD_REQUEST));
    }

    const partyObjectId = mongoose.Types.ObjectId.createFromHexString(id);

    // ✅ Check if party exists
    const partyExists = await Party.findById(partyObjectId);
    if (!partyExists) {
      return next(new ErrorHandler("Party not found", StatusCodes.NOT_FOUND));
    }

    // 🔹 Base query
    const query = {
      party_id: partyObjectId,
    };

    // 🔍 Search filter
    if (search?.trim()) {
      query.$or = [{ note: { $regex: search.trim(), $options: "i" } }, { transaction_module: { $regex: search.trim(), $options: "i" } }];
    }

    // 📅 Date filter (flexible)
    if (startDate || endDate) {
      query.date = {};

      if (startDate) {
        query.date.$gte = new Date(startDate);
      }

      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    // ✅ Total transaction count
    const total = await PartyTransactions.countDocuments(query);

    // ✅ Fetch paginated transactions
    const transactions = await PartyTransactions.find(query)
      .sort({ date: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    // ✅ Total transaction amount (same filters applied)
    const totalAmountResult = await PartyTransactions.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalAmount = totalAmountResult[0]?.totalAmount || 0;

    res.status(StatusCodes.OK).send({
      success: true,
      message: "Party transactions fetched successfully!",
      result: transactions,
      summary: {
        totalAmount,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const paymentForPartyPurchase = async (req, res, next) => {
  try {
    const { party_id, transaction_module_id, amount, date, note } = req.body;

    // 🔍 Validation
    if (!party_id || !transaction_module_id || !amount) {
      return next(new ErrorHandler("Party ID, Bill ID and amount are required", StatusCodes.BAD_REQUEST));
    }

    if (!mongoose.Types.ObjectId.isValid(party_id)) {
      return next(new ErrorHandler("Invalid Party ID", StatusCodes.BAD_REQUEST));
    }

    if (!mongoose.Types.ObjectId.isValid(transaction_module_id)) {
      return next(new ErrorHandler("Invalid Bill ID", StatusCodes.BAD_REQUEST));
    }

    const partyId = mongoose.Types.ObjectId.createFromHexString(party_id);
    const billId = mongoose.Types.ObjectId.createFromHexString(transaction_module_id);

    // ✅ Check Party
    const party = await Party.findById(partyId);
    if (!party) {
      return next(new ErrorHandler("Party not found", StatusCodes.NOT_FOUND));
    }

    // ✅ Check Bill
    const bill = await PartyBill.findById(billId);
    if (!bill) {
      return next(new ErrorHandler("Bill not found", StatusCodes.NOT_FOUND));
    }

    // 🔒 Pending amount check
    const pendingAmount = bill.bill_amount - bill.received_amount;

    if (Number(amount) > pendingAmount) {
      return next(new ErrorHandler(`Payment cannot be greater than pending amount (₹${pendingAmount})`, StatusCodes.BAD_REQUEST));
    }

    // ✅ Create transaction (PAYMENT = POSITIVE)
    await PartyTransactions.create({
      party_id: partyId,
      amount: Number(amount),
      date: date ? new Date(date) : new Date(),
      note: note || "",
      transaction_module: Constants.transactionModuleName.PartyPurchasePayment,
      transaction_module_id: billId,
    });

    // 🔄 UPDATE BILL DIRECTLY
    bill.received_amount += Number(amount);

    if (bill.received_amount === bill.bill_amount) {
      bill.payment_status = "RECEIVED";
    } else {
      bill.payment_status = "PENDING";
    }

    await bill.save();

    res.status(StatusCodes.CREATED).send({
      success: true,
      message: "Payment recorded successfully",
      data: {
        bill_id: bill._id,
        bill_amount: bill.bill_amount,
        received_amount: bill.received_amount,
        pending_amount: bill.bill_amount - bill.received_amount,
        payment_status: bill.payment_status,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const fetchAllPaymentsForPartyBill = async (req, res, next) => {
  try {
    const { billId } = req.params;

    // 🔍 Validate Bill ID
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      return next(new ErrorHandler("Invalid Party Bill ID", StatusCodes.BAD_REQUEST));
    }

    const billObjectId = mongoose.Types.ObjectId.createFromHexString(billId);

    // ✅ Check bill exists
    const bill = await PartyBill.findById(billObjectId).populate("party_id", "name");
    if (!bill) {
      return next(new ErrorHandler("Party Bill not found", StatusCodes.NOT_FOUND));
    }

    // 🔹 Fetch all payments for this bill
    const payments = await PartyTransactions.find({
      transaction_module: Constants.transactionModuleName.PartyPurchasePayment,
      transaction_module_id: billObjectId,
    }).sort({ date: -1, createdAt: -1 });

    // ✅ Calculate total paid
    const totalPaid = Math.abs(payments.reduce((sum, p) => sum + (p.amount || 0), 0));

    res.status(StatusCodes.OK).send({
      success: true,
      message: "Bill payment history fetched successfully!",
      data: {
        bill: {
          id: bill._id,
          partyName: bill.party_id?.name,
          billAmount: bill.bill_amount,
          totalPaid,
          pendingAmount: bill.bill_amount - totalPaid,
          status: bill.payment_status,
        },
        payments,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const partyTransactionController = {
  fetchPartyTransactionsByPartyId,
  paymentForPartyPurchase,
  fetchAllPaymentsForPartyBill,
};

export default partyTransactionController;
