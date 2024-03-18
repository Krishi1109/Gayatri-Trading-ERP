import ErrorHandler from "../utils/errorHandler";
import Stock from "../models/stocks";
import { StatusCodes } from "http-status-codes";

const addStocks = async (req, res, next) => {
  try {
    const stock = new Stock(req.body);

    const addStock = await stock.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add order Entry Successfully!",
      result: addStock,
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

const fetchStockList = async (req, res, next) => {
  try {
    const stockList = await Stock.find();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch Stock list successfully!",
      result: stockList,
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

const editStockList = async (req, res, next) => {
  try {
    const id = req.params.id;
    const orderQty = req.body.order_qty;

    const product = await Stock.findById(id);

    if (!product) {
      return next(new ErrorHandler("Not found!", StatusCodes.NOT_FOUND));
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

const stocksController = {
  addStocks,
  fetchStockList,
  editStockList,
};

export default stocksController;
