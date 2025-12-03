import Express from "express";
import authMiddleware from "../middlewares/authentication";
import partyController from "../controllers/party";
const router = Express.Router();

router.route("/").get(authMiddleware.authentication, partyController.fetchParties);

router.route("/").post(authMiddleware.authentication, partyController.addParty);

router.route("/:id").delete(authMiddleware.authentication, partyController.deleteParty);

export default router;
