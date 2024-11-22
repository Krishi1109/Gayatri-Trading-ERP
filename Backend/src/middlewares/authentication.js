import User from "../models/user.model";
import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    const verifyToken = jwt.verify(accessToken, "secret123");

    const loggedinUser = await User.findOne({ _id: verifyToken._id }).select(
      "-password"
    );

    req.loggedinUser = loggedinUser;

    next();
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Unauthorized : No token provided",
    });
  }
};

const authMiddleware = {
  authentication,
};

export default authMiddleware;
