import Express from "express";
import authMiddleware from "../middlewares/authentication";
import packageController from "../controllers/package.js";

const router = Express.Router();
router
  .route("/")
  .get(authMiddleware.authentication, packageController.fetchPackageVariant);

router
  .route("/")
  .post(authMiddleware.authentication, packageController.addPackageVariant);

router
  .route("/:id")
  .delete(
    authMiddleware.authentication,
    packageController.deletePackageVariant
  );

export default router;
