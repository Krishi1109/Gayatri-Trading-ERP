import ErrorHandler from "../utils/errorHandler";
import Variant from "../models/variant";
import { StatusCodes } from "http-status-codes";

const fetchVariants = async (req, res, next) => {
  try {
    const variants = await Variant.find();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch variants successfully!",
      result: variants,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const addVariant = async (req, res, next) => {
  try {
    const { variant } = req.body;
    const existVarint = await Variant.findOne({ variant });
    if (existVarint) {
      return next(new ErrorHandler("Ohh! Varint is already exist!", StatusCodes.CONFLICT));
    }
    const variantData = new Variant({ variant });

    const addVariant = await variantData.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Variant Successfully!",
      result: addVariant,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, error.status ?? StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const deleteVariant = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Variant.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Delete variant successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const variantController = {
  addVariant,
  fetchVariants,
  deleteVariant,
};

export default variantController;
