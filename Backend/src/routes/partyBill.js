import Express from "express";
import authMiddleware from "../middlewares/authentication";
import partyBillController from "../controllers/partyBill";
import pagination from "../middlewares/paginationMiddleware";
const router = Express.Router();

// router.route("/").get(authMiddleware.authentication, partyBillController.fetchPartyBills);

// Add Party BIll
router.route("/").post(authMiddleware.authentication, partyBillController.addPartyBill);

// Get Party bills by party_id
router.route("/:id").get(pagination, authMiddleware.authentication, partyBillController.getPartyBillsByPartyId);

// router.route("/:id").delete(authMiddleware.authentication, partyBillController.deletePartyBill);

export default router;
