import Express from "express";
import authMiddleware from "../middlewares/authentication";
import purchaseController from "../controllers/purchase";
const router = Express.Router();

router.route("/").post(authMiddleware.authentication, purchaseController.addPurchase);

router.route("/").get(authMiddleware.authentication, purchaseController.fetchPurchaseList);

// just for the demo purpose
router.route("/filter").get(authMiddleware.authentication, purchaseController.filteredPurchaseList);

router.route("/:id").put(authMiddleware.authentication, purchaseController.editOrderInPurchaseList);

// get data of purchase order according to its status, to show this data at the dashboard
router.route("/analysis/purchase-order-amount").get(authMiddleware.authentication, purchaseController.purchaseOrderAnalysisByStatus);

export default router;
