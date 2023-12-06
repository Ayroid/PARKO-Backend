// IMPORTING MODULES
const { StatusCodes } = require("http-status-codes");

// CUSTOM MODULE IMPORTS
const { PARKINGMODEL } = require("../models/parkingSpotModel");
const {
  READSPOT,
  CREATESPOT,
  UPDATESPOT,
  DELETESPOT,
} = require("./db/parkingSpotDatabase");

// CREATE NEW PARKING SPOT CONTROLLER
const createNewParkingSpot = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const data = ({ parkingNumber, coordinates, nearBy, parkingStatus } =
      req.body);

    console.log(data);

    // 2. CHECHKING IF SPOT EXISTS
    const spot = await READSPOT([
      { parkingNumber: parkingNumber },
      { coordinates: coordinates },
    ]);
    if (spot.length >= 1) {
      return res
        .status(StatusCodes.BAD_GATEWAY)
        .send("Spot is Already Mapped!");
    }

    // 3. CREATING FINAL DATA OBJECT
    const finaldata = {
      ...data,
      createdAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    };

    // 4. CREATING SPOT
    const created = await CREATESPOT(finaldata);

    // 5. SENDING RESPONSE
    if (created) {
      return res
        .status(StatusCodes.CREATED)
        .send({ parkingSpotId: created._id });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Creating Parking Spot!");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log("Error Creating Parking Spot! ❌ ", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Creating Spot!");
  }
};

// GET PARKING SPOTS CONTROLLER
const getParkingSpots = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    let { query } = req.body;

    // 2. CHECKING IF QUERY IS EMPTY
    if (query === null || query === undefined) {
      query = {};
    }
    // 3. GETTING PARKING SPOTS
    const spots = await READSPOT([query], {
      _id: 0,
      parkingNumber: 1,
      coordinates: 1,
      parkingStatus: 1,
      nearBy: 1,
      currentlyParkedUser: 1,
      currentlyParkedVehicle: 1,
    });

    // 4. SENDING RESPONSE
    if (spots.length >= 0) {
      return res.status(StatusCodes.OK).send({ parkingSpots: spots });
    } else {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("No Parking Spots Found!");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Getting Parking Spots!");
  }
};

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
        .send("Parking Spot Not Found!");
    }

    const finalData = {
      ...data,
      updatedAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    };

    // 3. UPDATING SPOT STATUS
    const updated = await UPDATESPOT(query, finalData);

    // 4. SENDING RESPONSE
    if (updated) {
      return res.status(StatusCodes.OK).send(updated);
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Updating parking Spot!");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Updating parking Spot!");
  }
};

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
        .send("Parking Spot not Found!");
    }

    // 3. DELETING SPOT
    const deleted = await DELETESPOT(query);

    // 4. SENDING RESPONSE
    if (deleted) {
      return res.status(StatusCodes.OK).send("Parking Deleted!", deleted);
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Deleting parking Spot!");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Deleting parking Spot!");
  }
};

// BOOK PARKING SPOT CONTROLLER
const bookParkingSpot = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { parkingNumber } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await READSPOT([{ parkingNumber: parkingNumber }]);
    if (spot.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Parking Spot Not Found!");
    }

    // 3. UPDATING SPOT STATUS

    const query = { parkingNumber: parkingNumber };
    const data = {
      currentlyParkedUser: req.payload.userId,
      parkingStatus: "booked",
      updatedAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    };

    const updated = await UPDATESPOT(query, data);

    // 4. SENDING RESPONSE
    if (updated) {
      return res.status(StatusCodes.OK).send("Parking Spot Booked ✅");
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Booking Parking Spot!");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Booking Parking Spot!");
  }
};

// CANCEL PARKING SPOT CONTROLLER
const cancelParkingSpot = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { parkingNumber } = req.body;

    // 2. CHECKING IF SPOT EXISTS
    const spot = await READSPOT([
      { parkingNumber: parkingNumber, currentlyParkedUser: req.payload.userId },
    ]);
    if (spot.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .send("Parking Spot Not Found!");
    }

    // 3. UPDATING SPOT STATUS

    const query = { parkingNumber: parkingNumber };
    const data = {
      currentlyParkedUser: null,
      parkingStatus: "available",
      updatedAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    };

    const updated = await UPDATESPOT(query, data);

    // 4. SENDING RESPONSE
    if (updated) {
      return res
        .status(StatusCodes.OK)
        .send("Parking Spot Booking Cancelled!");
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Cancelling Parking Spot Booking!");
    }
  } catch (error) {
    // 5. HANDLING ERRORS
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Cancelling Parking Spot Booking!");
  }
};

module.exports = {
  CREATENEWPARKINGSPOT: createNewParkingSpot,
  UPDATEPARKINGSPOT: updateParkingSpot,
  DELETEPARKINGSPOT: deleteParkingSpot,
  GETPARKINGSPOTS: getParkingSpots,
  BOOKPARKINGSPOT: bookParkingSpot,
  CANCELPARKINGSPOT: cancelParkingSpot,
};
