import Express from "express";
import authMiddleware from "../middlewares/authentication";
import partyTransactionsController from "../controllers/partyTransaction";
import pagination from "../middlewares/paginationMiddleware";
const router = Express.Router();

// Get Party Transactions by PartyId
router.route("/:id").get(pagination, authMiddleware.authentication, partyTransactionsController.fetchPartyTransactionsByPartyId);

// Payment In for the particular purchase bill for the particular party
router.route("/payment").post(authMiddleware.authentication, partyTransactionsController.paymentForPartyPurchase);

// Fetch all the payments by party purchase id
router.route("/bill_payments/:billId").get(authMiddleware.authentication, partyTransactionsController.fetchAllPaymentsForPartyBill);

export default router;
