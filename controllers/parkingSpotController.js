// IMPORTING MODULES
const { StatusCodes } = require("http-status-codes");

// ----------------------------------------------------------------

// CUSTOM MODULE IMPORTS
const { PARKINGMODEL } = require("../models/parkingSpotModel");
const {
  READSPOT,
  CREATESPOT,
  UPDATESPOT,
  DELETESPOT,
} = require("./db/parkingSpotDatabase");
const { Query } = require("mongoose");

// ----------------------------------------------------------------

// CREATE NEW PARKING SPOT CONTROLLER
const createNewParkingSpot = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const data = ({ parkingNumber, location } = req.body);

    // 2. CHECHKING IF SPOT EXISTS
    const spot = await READSPOT([
      { parkingNumber: parkingNumber },
      { location: location },
    ]);
    if (spot.length >= 1) {
      return res
        .status(StatusCodes.BAD_GATEWAY)
        .send("Spot is Already Mapped ! ❌");
    }

    // 3. CREATING FINAL DATA OBJECT
    const finaldata = {
      ...data,
      lastParked: "",
      currentlyParked: "",
      createdAt: Date.now(),
    };

    // 4. CREATING SPOT
    const created = await CREATESPOT(finaldata);

    // 5. SENDING RESPONSE
    if (created) {
      res.status(StatusCodes.CREATED).send({ parkingSpotId: created._id });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Creating Parking Spot! ❌ ");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log("Error Creating Parking Spot! ❌ ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Creating Spot ! ❌");
  }
};

// ----------------------------------------------------------------

// GET PARKING SPOTS CONTROLLER
const getParkingSpots = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query } = req.body;

    // 2. CHECKING IF QUERY IS EMPTY
    if (query === null || query === undefined) {
      query = {};
    }
    // 3. GETTING PARKING SPOTS
    const spots = await READSPOT([query]);

    // 4. SENDING RESPONSE
    if (spots.length >= 0) {
      res.status(StatusCodes.OK).send({ spots });
    } else {
      res.status(StatusCodes.NOT_FOUND).send("No Parking Spots Found! ❌");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Getting Parking Spots! ❌");
  }
};

// ----------------------------------------------------------------

// UPDATE PARKING SPOT CONTROLLER
const updateParkingSpot = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query, data } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await READSPOT([query]);
    if (spot.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Parking Spot Not Found ! ❌");
    }

    // 3. UPDATING SPOT STATUS
    const updated = await UPDATESPOT(query, data);

    // 4. SENDING RESPONSE
    if (updated) {
      res.status(StatusCodes.OK).send(updated);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Updating parking Spot! ❌");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Updating parking Spot! ❌");
  }
};

// ----------------------------------------------------------------

// DELETE PARKING SPOT CONTROLLER
const deleteParkingSpot = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await READSPOT([query]);
    if (spot.length !== 1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Parking Spot not Found ! ❌");
    }

    // 3. DELETING SPOT
    const deleted = await DELETESPOT(query);

    // 4. SENDING RESPONSE
    if (deleted) {
      res.status(StatusCodes.OK).send("Parking Deleted ✅", deleted);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Deleting parking Spot! ❌");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Deleting parking Spot! ❌");
  }
};

module.exports = {
  CREATENEWPARKINGSPOT: createNewParkingSpot,
  UPDATEPARKINGSPOT: updateParkingSpot,
  DELETEPARKINGSPOT: deleteParkingSpot,
  GETPARKINGSPOTS: getParkingSpots,
};
