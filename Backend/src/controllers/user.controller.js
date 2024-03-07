import userServices from "../services/user.services";
import ErrorHandler from "../utils/errorHandler";

const demo = (req, res, next) => {
  try {
    const response = userServices.loginService();

    if (response.length < 5) {
      return next(new ErrorHandler("Error has occored", 420));
    }
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "I am from Catch",
    });
  }
};

const userController = {
  demo,
};

export default userController;
