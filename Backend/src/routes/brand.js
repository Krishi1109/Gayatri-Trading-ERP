import Express from "express";
import authMiddleware from "../middlewares/authentication";
import brandController from "../controllers/brand";
const router = Express.Router();

router
  .route("/")
  .get(authMiddleware.authentication, brandController.fetchBrands);

router.route("/").post(authMiddleware.authentication, brandController.addBrand);

router
  .route("/:id")
  .delete(authMiddleware.authentication, brandController.deleteBrand);

export default router;
