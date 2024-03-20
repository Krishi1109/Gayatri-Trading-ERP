import ErrorHandler from "../utils/errorHandler";
import Brand from "../models/brand";
import { StatusCodes } from "http-status-codes";

const fetchBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch Brands successfully!",
      result: brands,
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

const addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    name.toUpperCase();
    const existBrandName = await Brand.findOne({ name });
    if (existBrandName) {
      return next(
        new ErrorHandler(
          "Ohh! Brand with this name is already exist!",
          StatusCodes.CONFLICT
        )
      );
    }
    const brand = new Brand({ name: name.toUpperCase() });

    const addBrand = await brand.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Brand Successfully!",
      result: addBrand,
    });
  } catch (error) {
    return next(
      new ErrorHandler(
        error.message ?? Constants.defaultMessage,
        error.status ?? StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Brand.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Delete brand successfully!",
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

const brandController = {
  addBrand,
  fetchBrands,
  deleteBrand,
};

export default brandController;
