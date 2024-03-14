import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Constants from "../constants";
import userServices from "../services/user.services";
import ErrorHandler from "../utils/errorHandler";
import User from "../models/user.model";

const demo = (req, res, next) => {
  try {
    const response = userServices.demoService();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "This is demmo API!!",
      result: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "I am from Catch",
    });
  }
};

const userRegister = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = new User({ userName, password });

    const registerUser = await user.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "User register successfully!",
      result: registerUser,
    });
  } catch (error) {
    console.error(error);
    return next(
      new ErrorHandler(
        error.message ?? Constants.defaultMessage,
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      userName,
    });

    if (!userName && !password) {
      return next(
        new ErrorHandler(
          "Username and password are reqruired feilds",
          StatusCodes.BAD_REQUEST
        )
      );
    }

    if (!user) {
      return next(new ErrorHandler("User not found!", StatusCodes.NOT_FOUND));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Invalid Credentials", StatusCodes.UNAUTHORIZED)
      );
    }
    let token = jwt.sign({ _id: user._id }, "secret123");

    res.status(StatusCodes.OK).send({
      success: true,
      message: "User Logged in successfully!",
      result: {
        token,
      },
    });
  } catch (error) {
    new ErrorHandler(
      error.message ?? Constants.defaultMessage,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const userProfile = async (req, res, next) => {
  try {
    const response = req.loggedinUser;
    res.status(StatusCodes.OK).send({
      success: true,
      message: "User profile fetch successfully!",
      result: response,
    });
  } catch (error) {
    new ErrorHandler(
      error.message ?? Constants.defaultMessage,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

const userController = {
  demo,
  userRegister,
  userLogin,
  userProfile,
};

export default userController;
