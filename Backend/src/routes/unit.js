import Express from "express";
import authMiddleware from "../middlewares/authentication";
import unitController from "../controllers/unit";
const router = Express.Router();

router.route("/").get(authMiddleware.authentication, unitController.fetchUnits);

router.route("/").post(authMiddleware.authentication, unitController.addUnit);

router.route("/:id").delete(authMiddleware.authentication, unitController.deleteUnit);

export default router;
