// DOT ENV CONFIG
require("dotenv").config();

// MODULES IMPORT
const { StatusCodes } = require("http-status-codes");

// IMPORTING DATABASE CONTROLLERS

const { READSPOT, UPDATESPOT } = require("./db/parkingSpotDatabase");

// ADD CAMERA MAPPING CONTROLLER

const addCameraMapping = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query, data } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await READSPOT([query]);
    if (spot.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("Spot Not Found!");
    }

    // 3. UPDATING SPOT
    const updated = await UPDATESPOT(query, data);

    // 4. SENDING RESPONSE
    if (updated) {
      return res.status(StatusCodes.OK).send("Camera Mapped!");
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Updating Spot!");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log("Error Mapping Camera! ❌ ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Mapping Camera!");
  }
};

// GET BOOKING STATUS CONTROLLER

const getBookingStatus = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    let { query } = req.body;

    // 2. CHECKING IF QUERY IS VALID
    if (query === undefined || query === null) {
      query = {};
    }

    // 3. CREATING FIELDS OBJECT
    const fields = {
      _id: 0,
      parkingNumber: 1,
      coordinates: 1,
      parkingStatus: 1,
      currentlyParkedUser: 1,
      currentlyParkedVehicle: 1,
    };

    // 4. CHECKING IF SPOT EXISTS
    const spots = await READSPOT([query], fields);
    if (spots.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).send("Spot Not Found!");
    }

    // 5. SENDING RESPONSE
    return res.status(StatusCodes.OK).send({ parkingSpots: spots });
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log("Error Getting Parking Spot! ❌ ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Getting Parking Spot!");
  }
};

// CONFIRM BOOKING STATUS CONTROLLER

const confirmBookingStatus = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query, data } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await READSPOT([query]);
    if (spot.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("Spot Not Found!");
    }

    // 3. CHECKING IF SPOT IS ALREADY BOOKED
    if (spot[0].parkingStatus !== "booked") {
      return res.status(StatusCodes.BAD_REQUEST).send("Spot not Pre-Booked!");
    }

    // 4. CHECK IF PARKING SPOT IS ALREADY PARKED
    if (spot[0].parkingStatus === "parked") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Parking Spot Already Parked!");
    }

    // 5. UPDATING SPOT
    const updated = await UPDATESPOT(query, data);

    // 6. SENDING RESPONSE
    if (updated) {
      return res.status(StatusCodes.OK).send("Booking Confirmed!");
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Updating Spot!");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log("Error Confirming Parking Spot! ❌ ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Confirming Parking Spot!");
  }
};

// CANCEL BOOKING STATUS CONTROLLER

const cancelBookingStatus = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query, data } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await READSPOT([query]);
    if (spot.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("Spot Not Found!");
    }

    // 3. CHECKING IF SPOT IS ALREADY BOOKED
    if (spot[0].parkingStatus === "available") {
      return res.status(StatusCodes.BAD_REQUEST).send("Spot Not Booked!");
    }

    // 4. UPDATING SPOT
    const updated = await UPDATESPOT(query, data);

    // 5. SENDING RESPONSE
    if (updated) {
      return res.status(StatusCodes.OK).send("Booking Cancelled!");
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Updating Spot!");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log("Error Cancelling Parking Spot! ❌ ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Cancelling Parking Spot!");
  }
};

// EXPORTING MODULES

module.exports = {
  ADDCAMERAMAPPING: addCameraMapping,
  GETBOOKINGSTATUS: getBookingStatus,
  CONFIRMBOOKINGSTATUS: confirmBookingStatus,
  CANCELBOOKINGSTATUS: cancelBookingStatus,
};
