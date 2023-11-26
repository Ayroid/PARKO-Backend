// MODULES IMPORT
const express = require("express");

// CONTROLLERS IMPORT
const {
  GETPARKINGSPOTS,
  CREATENEWPARKINGSPOT,
  UPDATEPARKINGSPOT,
  DELETEPARKINGSPOT,
  BOOKPARKINGSPOT,
} = require("../controllers/parkingSpotController");

// JWT IMPORT
const { VERIFYTOKEN } = require("../middlewares/jwtAuthMW");

// CREATING ROUTER
const PARKINGSPOT = express.Router();

// PARKING SPOT ROUTES
PARKINGSPOT.post("/createParkingSpot", CREATENEWPARKINGSPOT);
PARKINGSPOT.post("/getParkingSpot", GETPARKINGSPOTS);
PARKINGSPOT.post("/updateParkingSpot", UPDATEPARKINGSPOT);
PARKINGSPOT.post("/deleteParkingSpot", DELETEPARKINGSPOT);

PARKINGSPOT.post("/bookParkingSpot", VERIFYTOKEN, BOOKPARKINGSPOT);

// EXPORTING ROUTER
module.exports = {
  PARKINGSPOTROUTER: PARKINGSPOT,
};
