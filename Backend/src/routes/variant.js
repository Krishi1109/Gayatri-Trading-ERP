import Express from "express";
import authMiddleware from "../middlewares/authentication";
import variantController from "../controllers/variant";
const router = Express.Router();

router.route("/").get(authMiddleware.authentication, variantController.fetchVariants);

router.route("/").post(authMiddleware.authentication, variantController.addVariant);

router.route("/:id").delete(authMiddleware.authentication, variantController.deleteVariant);

export default router;
