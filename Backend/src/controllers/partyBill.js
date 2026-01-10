import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import partyBill from "../models/partyBills";
import partyTransactions from "../models/partyTransactions";
import Constants from "../constants";

// const fetchParties = async (req, res, next) => {
//   try {
//     const parties = await Party.find();
//     res.status(StatusCodes.OK).send({
//       success: true,
//       message: "Fetch Parties successfully!",
//       result: parties,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
//   }
// };

const addPartyBill = async (req, res, next) => {
  try {
    const { partyId, billAmount, date, note } = req.body;

    if (!partyId || !billAmount) {
      return next(new ErrorHandler("Party ID and Bill Amount are required", StatusCodes.BAD_REQUEST));
    }

    // -------------------------
    // 1️⃣ CREATE PARTY BILL
    // -------------------------
    const newPartyBill = await partyBill.create({
      party_id: partyId,
      bill_amount: billAmount,
      date: date ? new Date(date) : new Date(),
      note,
    });

    // -------------------------
    // 2️⃣ CREATE PARTY TRANSACTION
    // -------------------------
    await partyTransactions.create({
      party_id: partyId,
      date: newPartyBill.date,
      amount: -billAmount,
      transaction_module: Constants.transactionModuleName.PartyPurchaseBill,
      transaction_module_id: newPartyBill._id.toString(),
      note,
    });

    // -------------------------
    // RESPONSE
    // -------------------------
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Party Bill added successfully!",
      result: newPartyBill,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, error.status ?? StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const getPartyBillsByPartyId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorHandler("Party ID is required", StatusCodes.BAD_REQUEST));
    }

    // Pagination from middleware
    const { page, limit } = req.pagination;
    const skip = (page - 1) * limit;

    // Query params
    const { search, status, startDate, endDate } = req.query;

    // -------------------------
    // BUILD FILTER
    // -------------------------
    const filter = {
      party_id: id,
    };

    // 🔹 Filter by payment status
    if (status) {
      filter.payment_status = status; // PENDING | RECEIVED
    }

    // 🔹 Search by note or bill amount
    if (search) {
      filter.$or = [{ note: { $regex: search, $options: "i" } }, { bill_amount: Number(search) || -1 }];
    }

    // 🔹 Date range filter
    if (startDate || endDate) {
      filter.date = {};

      if (startDate) {
        filter.date.$gte = new Date(startDate);
      }

      if (endDate) {
        filter.date.$lte = new Date(endDate);
      }
    }

    // -------------------------
    // QUERY DATA
    // -------------------------
    const bills = await partyBill
      .find(filter)
      .sort({ date: -1, createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    const total = await partyBill.countDocuments(filter);

    // -------------------------
    // RESPONSE
    // -------------------------
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Party bills fetched successfully",
      data: bills,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, error.status ?? StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

// const deleteParty = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     await Party.findByIdAndDelete(id);
//     res.status(StatusCodes.OK).send({
//       success: true,
//       message: "Delete party successfully!",
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
//   }
// };

const partyController = {
  addPartyBill,
  getPartyBillsByPartyId,
  //   fetchParties,
  //   deleteParty,
};

export default partyController;
