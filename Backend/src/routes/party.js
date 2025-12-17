import Express from "express";
import authMiddleware from "../middlewares/authentication";
import partyController from "../controllers/party";
import pagination from "../middlewares/paginationMiddleware";
const router = Express.Router();

// Fetch all the party --- pagination, search
router.route("/").get(pagination, authMiddleware.authentication, partyController.fetchParties);

// Post Party
router.route("/").post(authMiddleware.authentication, partyController.addParty);

// Delete Party
router.route("/:id").delete(authMiddleware.authentication, partyController.deleteParty);

export default router;
