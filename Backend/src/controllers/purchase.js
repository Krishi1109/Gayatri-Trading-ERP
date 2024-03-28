import ErrorHandler from "../utils/errorHandler";
import Purchase from "../models/purchase";
import { StatusCodes } from "http-status-codes";

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

const filteredPurchaseList = async (req, res, next) => {
  try {
    const { brand, category } = req.query;
    const purchaseList = await Purchase.find({}).sort({ createdAt: -1 });
    let filteredResult = purchaseList;
    if (brand) {
      filteredResult = purchaseList.filter((item) => item.brand === brand);
    }
    if (category) {
      filteredResult = purchaseList.filter((item) => item.category === category);
    }
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

const purchaseController = {
  addPurchase,
  fetchPurchaseList,
  editOrderInPurchaseList,
  filteredPurchaseList,
};

export default purchaseController;
