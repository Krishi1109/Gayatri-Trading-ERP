import Express from "express";
import authMiddleware from "../middlewares/authentication";
import partyBillController from "../controllers/partyBill";
const router = Express.Router();

// router.route("/").get(authMiddleware.authentication, partyBillController.fetchPartyBills);

router.route("/").post(authMiddleware.authentication, partyBillController.addPartyBill);

// router.route("/:id").delete(authMiddleware.authentication, partyBillController.deletePartyBill);

export default router;
