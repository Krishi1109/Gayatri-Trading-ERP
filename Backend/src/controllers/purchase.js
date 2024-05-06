import ErrorHandler from "../utils/errorHandler";
import Purchase from "../models/purchase";
import { StatusCodes } from "http-status-codes";
import purchaseServices from "../services/purchase.services";

const addPurchase = async (req, res, next) => {
  try {
    const purchase = new Purchase(req.body);

    const addPurchase = await purchase.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Purchase Entry Successfully!",
      result: addPurchase,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const fetchPurchaseList = async (req, res, next) => {
  try {
    const purchaseList = await Purchase.find({}).sort({ createdAt: -1 });
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch Purchas list successfully!",
      result: purchaseList,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

// Just for the demo purpose
const filteredPurchaseList = async (req, res, next) => {
  try {
    const { brand, category, status } = req.query;
    const purchaseList = await Purchase.find();
    let filteredResult = purchaseList;
    filteredResult = await purchaseList.filter(
      (item) => item.category && item.category === category && (item.status && item.status === status) & (item.brand && item.brand === brand)
    );
    if (brand) {
      filteredResult = filteredResult.filter((item) => item.brand === brand);
    }
    if (category) {
      filteredResult = filteredResult.filter((item) => item.category === category);
    }
    if (status) {
      filteredResult = filteredResult.filter((item) => item.status === status);
    }
    console.log(filteredResult.length);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch Purchas list successfully!",
      result: filteredResult,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const editOrderInPurchaseList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderQty = req.body.order_qty;

    const product = await Purchase.findById(id);

    if (!product) {
      return next(new ErrorHandler("Not found!", StatusCodes.NOT_FOUND));
    }

    if (product.ordered_qty + orderQty > product.qty) {
      return next(new ErrorHandler("input valid qty", StatusCodes.NOT_FOUND));
    } else {
      product.ordered_qty += orderQty;
    }
    if (product.ordered_qty < product.qty) {
      product.status = "ACTIVE";
    }
    if (product.ordered_qty == product.qty) {
      product.status = "COMPLETED";
    }
    product.orders.push({ order_qty: orderQty, order_date: new Date() });

    await product.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add order qty successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

// get purchase data for different status to show on the dashboard
const purchaseOrderAnalysisByStatus = async (req, res, next) => {
  try {
    const { year } = req.headers;
    const response = await purchaseServices.purchaseAmountByStatus(year);
    res.status(response.status ?? StatusCodes.OK).send({
      success: response.success,
      message: response.message,
      result: response?.result,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

// Get total purchase amount monthly - for dashboard graph
const purchaseTotalAmountByMonth = async (req, res, next) => {
  try {
    const response = await purchaseServices.purchaseTotalAmountByMonth();
    res.status(response.status ?? StatusCodes.OK).send({
      success: response.success,
      message: response.message,
      result: response?.result,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};
const purchaseController = {
  addPurchase,
  fetchPurchaseList,
  editOrderInPurchaseList,
  filteredPurchaseList,
  purchaseOrderAnalysisByStatus,
  purchaseTotalAmountByMonth,
};

export default purchaseController;
