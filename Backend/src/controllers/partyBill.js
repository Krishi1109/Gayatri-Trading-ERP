import ErrorHandler from "../utils/errorHandler";
import { StatusCodes } from "http-status-codes";
import partyBill from "../models/partyBills";

// const fetchParties = async (req, res, next) => {
//   try {
//     const parties = await Party.find();
//     res.status(StatusCodes.OK).send({
//       success: true,
//       message: "Fetch Parties successfully!",
//       result: parties,
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
//   }
// };

const addPartyBill = async (req, res, next) => {
  try {
    const { partyId, billAmount, date, note } = req.body;

    const newPartyBill = new partyBill({ party_id: partyId, bill_amount: billAmount, date, note });

    const addPartyBil = await newPartyBill.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Party Bil Added Successfully!",
      result: addPartyBil,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, error.status ?? StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

// const deleteParty = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     await Party.findByIdAndDelete(id);
//     res.status(StatusCodes.OK).send({
//       success: true,
//       message: "Delete party successfully!",
//     });
//   } catch (error) {
//     return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
//   }
// };

const partyController = {
  addPartyBill,
  //   fetchParties,
  //   deleteParty,
};

export default partyController;
