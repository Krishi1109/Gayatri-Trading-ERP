import ErrorHandler from "../utils/errorHandler";
import Purchas from "../models/purchase";
import { StatusCodes } from "http-status-codes";

const addPurchase = async (req, res, next) => {
  try {
    const purchase = new Purchas(req.body);

    const addPurchase = await purchase.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Purchase Entry Successfully!",
      result: addPurchase,
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        error.message ?? Constants.defaultMessage,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const fetchPurchaseList = async (req, res, next) => {
  try {
    const purchaseList = await Purchas.find();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch Purchas list successfully!",
      result: purchaseList,
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        error.message ?? Constants.defaultMessage,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const editOrderInPurchaseList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderQty = req.body.order_qty;

    const product = await Purchas.findById(id);

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
    return next(
      new ErrorHandler(
        error.message ?? Constants.defaultMessage,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const purchaseController = {
  addPurchase,
  fetchPurchaseList,
  editOrderInPurchaseList,
};

export default purchaseController;
