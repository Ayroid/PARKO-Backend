// IMPORTING MODULES
const { StatusCodes } = require("http-status-codes");

// CUSTOM MODULE IMPORTS
const { PARKINGMODEL } = require("../models/parkingModel");
const { READSPOT, CREATESPOT } = require("./db/parkingSpotDatabase");

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
      lastParked: null,
      currentlyParked: null,
      createdAt: Date.now(),
    };

    // 4. CREATING SPOT
    const created = await CREATESPOT(finaldata);

    // 5. SENDING RESPONSE
    if (created) {
      res.status(StatusCodes.CREATED).send({ created: created });
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
    if (query === null) {
      query = {};
    }
    // 2. GETTING PARKING SPOTS
    const spots = await READSPOT(query);

    // 3. SENDING RESPONSE
    res.status(StatusCodes.OK).send({ spots });
  } catch (error) {
    // 4. HANDLING ERRORS
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
    const { spotId, dataToUpdate } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await PARKINGMODEL.findById(spotId);
    if (spot.length !== 1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Parking Spot not Found ! ❌");
    }

    // 3. UPDATING SPOT STATUS
    await PARKINGMODEL.findByIdAndUpdate(spotId, dataToUpdate);

    // 4. SENDING RESPONSE
    res.status(StatusCodes.OK).send("Parking spot status updated! ✅ ");
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
    const { spotId } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await PARKINGMODEL.findById(spotId);
    if (spot.length !== 1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Parking Spot not Found ! ❌");
    }

    // 3. DELETING SPOT
    await PARKINGMODEL.findByIdAndDelete(spotId);

    // 4. SENDING RESPONSE
    res.status(StatusCodes.OK).send("Parking spot deleted Sucessfully! ✅ ");
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
