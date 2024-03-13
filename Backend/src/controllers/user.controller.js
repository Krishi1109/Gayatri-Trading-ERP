import userServices from "../services/user.services";
import ErrorHandler from "../utils/errorHandler";
import {StatusCodes} from "http-status-codes"

const demo = (req, res, next) => {
  try {
    const response = userServices.demoService();

    if (response.length < 5) {
      return next(new ErrorHandler("Error has occored", 420));
    }
    res.status(StatusCodes.OK).send({
      success : true,
      message : "This is demmo API!!",
      result : response
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "I am from Catch",
    });
  }
};

const userRegister = (req, res, next) => {
  try {
    return next(new ErrorHandler("Data not found!", 404))
  } catch (error) {
    return next(new ErrorHandler("Something went wrong!", 500))
  }
};

const userController = {
  demo,
  userRegister,
};

export default userController;
