import { StatusCodes } from "http-status-codes";
import Category from "../models/category";
import ErrorHandler from "../utils/errorHandler";

const fetchCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch categories successfully!",
      result: categories,
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

const addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = new Category({ name: name.toUpperCase() });

    const addCategory = await category.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Categoty Successfully!",
      result: addCategory,
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

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Delete Category successfully!",
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

const categoryController = {
  fetchCategory,
  addCategory,
  deleteCategory,
};

export default categoryController;
