import Express from "express";
import authMiddleware from "../middlewares/authentication.js";
import categoryController from "../controllers/category.js";

const router = Express.Router();
router
  .route("/")
  .get(authMiddleware.authentication, categoryController.fetchCategory);

router
  .route("/")
  .post(authMiddleware.authentication, categoryController.addCategory);

router
  .route("/:id")
  .delete(
    authMiddleware.authentication,
    categoryController.deleteCategory
  );

export default router;
