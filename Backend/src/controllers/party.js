import ErrorHandler from "../utils/errorHandler";
import Party from "../models/party";
import { StatusCodes } from "http-status-codes";

const fetchParties = async (req, res, next) => {
  try {
    const { page, limit } = req.pagination;
    const search = req.query.search?.trim();

    const query = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }, { code: { $regex: search, $options: "i" } }],
        }
      : {};

    const total = await Party.countDocuments(query);

    const parties = await Party.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(StatusCodes.OK).send({
      success: true,
      message: "Fetch Parties successfully!",
      result: parties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const fetchPartiesAuto = async (req, res, next) => {
  try {
    const { page, limit } = req.pagination;
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }, { code: { $regex: search, $options: "i" } }],
        }
      : {};

    const total = await Party.countDocuments(query);

    const parties = await Party.find(query)
      .select("_id name code") // 👈 IMPORTANT for autocomplete
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      result: parties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const addParty = async (req, res, next) => {
  try {
    const { name, code, mobile, address } = req.body;
    code.toUpperCase();
    const existPartyName = await Party.findOne({ name });
    if (existPartyName) {
      return next(new ErrorHandler("Ohh! Party with this name is already exist!", StatusCodes.CONFLICT));
    }

    const existPartyCode = await Party.findOne({ code });
    if (existPartyCode) {
      return next(new ErrorHandler("Ohh! Party with this code is already exist!", StatusCodes.CONFLICT));
    }

    const party = new Party({ name, code: code.toUpperCase(), mobile, address });

    const addParty = await party.save();
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Add Party Successfully!",
      result: addParty,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, error.status ?? StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const deleteParty = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Party.findByIdAndDelete(id);
    res.status(StatusCodes.OK).send({
      success: true,
      message: "Delete party successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message ?? Constants.defaultMessage, StatusCodes.INTERNAL_SERVER_ERROR));
  }
};

const partyController = {
  addParty,
  fetchParties,
  fetchPartiesAuto,
  deleteParty,
};

export default partyController;
