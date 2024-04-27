import Express from "express";
import authMiddleware from "../middlewares/authentication";
import purchaseController from "../controllers/purchase";
const router = Express.Router();

router.route("/").post(authMiddleware.authentication, purchaseController.addPurchase);

router.route("/").get(authMiddleware.authentication, purchaseController.fetchPurchaseList);

// just for the demo purpose
router.route("/filter").get(authMiddleware.authentication, purchaseController.filteredPurchaseList);

router.route("/:id").put(authMiddleware.authentication, purchaseController.editOrderInPurchaseList);

export default router;
