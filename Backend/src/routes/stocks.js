import Express from "express";
import authMiddleware from "../middlewares/authentication";
import stocksController from "../controllers/stocks";
const router = Express.Router();

router
  .route("/")
  .post(authMiddleware.authentication, stocksController.addStocks);

router
  .route("/")
  .get(authMiddleware.authentication, stocksController.fetchStockList);

router
  .route("/:id")
  .put(authMiddleware.authentication, stocksController.editStockList);

export default router;
