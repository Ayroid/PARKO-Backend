// MODULES IMPORT
const express = require("express");

// CONTROLLERS IMPORT
const {
  GETPARKINGSPOTS,
  CREATENEWPARKINGSPOT,
  UPDATEPARKINGSPOT,
  DELETEPARKINGSPOT,
} = require("../controllers/parkingSpotController");

// CREATING ROUTER
const PARKINGSPOT = express.Router();

// PARKING SPOT ROUTES
PARKINGSPOT.post("/createParkingSpot", CREATENEWPARKINGSPOT);
PARKINGSPOT.post("/getParkingSpot", GETPARKINGSPOTS);
PARKINGSPOT.post("/updateParkingSpot", UPDATEPARKINGSPOT);
PARKINGSPOT.post("/deleteParkingSpot", DELETEPARKINGSPOT);

// EXPORTING ROUTER
module.exports = {
  PARKINGSPOTROUTER: PARKINGSPOT,
};
