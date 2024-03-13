import Express from "express";
import userController from "../controllers/user.controller";

const router = Express.Router();

router.route("/demo").get(userController.demo);
router.route("/register").post(userController.userRegister)

export default router;
