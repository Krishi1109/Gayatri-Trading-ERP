import Express from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middlewares/authentication";

const router = Express.Router();

router.route("/demo").get(userController.demo);
router.route("/register").post(userController.userRegister);
router.route("/login").post(userController.userLogin);
router
  .route("/me")
  .get(authMiddleware.authentication, userController.userProfile);

export default router;
