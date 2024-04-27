import ErrorHandler from "../utils/errorHandler";
import Unit from "../models/unit";
import { StatusCodes } from "http-status-codes";

const fetchUnits = async (req, res, next) => {
  try {
    const units = await Unit.find();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch units successfully!",
      result: units,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const addUnit = async (req, res, next) => {
  try {
    const { unit } = req.body;
    const existVarint = await Unit.findOne({ unit });
    if (existVarint) {
      return next(new ErrorHandler("Ohh! Varint is already exist!", StatusCodes.CONFLICT));
    }
    const unitData = new Unit({ unit });

    const addUnit = await unitData.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Unit Successfully!",
      result: addUnit,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, error.status ?? StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const deleteUnit = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Unit.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Delete unit successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const unitController = {
  addUnit,
  fetchUnits,
  deleteUnit,
};

export default unitController;
