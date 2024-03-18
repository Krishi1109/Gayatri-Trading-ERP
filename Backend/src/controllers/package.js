import { StatusCodes } from "http-status-codes";
import Package from "../models/package";
import ErrorHandler from "../utils/errorHandler";

const fetchPackageVariant = async (req, res, next) => {
  try {
    const packageVariants = await Package.find();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch all packages successfully!",
      result: packageVariants,
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

const addPackageVariant = async (req, res, next) => {
  try {
    const { name } = req.body;
    const packageVariant = new Package({ name: name.toUpperCase() });

    const addPackageVariant = await packageVariant.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Brand Successfully!",
      result: addPackageVariant,
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

const deletePackageVariant = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Package.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Delete package variant successfully!",
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

const packageController = {
  fetchPackageVariant,
  addPackageVariant,
  deletePackageVariant,
};

export default packageController;
