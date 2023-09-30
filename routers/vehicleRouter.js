// MODULES IMPORT
const express = require("express");

// CONTROLLERS IMPORT
const {
  READVEHICLE,
  REGISTERVEHICLE,
  UPDATEVEHICLE,
  DELETEVEHICLE,
} = require("../controllers/vehicleController");

// JWT IMPORT
const { VERIFYTOKEN } = require("../middlewares/jwtAuthMW");

// CREATING ROUTER
const VEHICLE = express.Router();

// API ENDPOINTS
VEHICLE.get("/test", (req, res) => {
  res.send("test");
});

// VEHICLE ROUTES
VEHICLE.post("/registerVehicle", VERIFYTOKEN, REGISTERVEHICLE);
VEHICLE.post("/getVehicle", VERIFYTOKEN, READVEHICLE);
VEHICLE.post("/updateVehicle", VERIFYTOKEN, UPDATEVEHICLE);
VEHICLE.post("/deleteVehicle", VERIFYTOKEN, DELETEVEHICLE);
// VEHICLE.post("/logout", LOGOUTVEHICLE);

// PARKING ROUTES
// VEHICLE.post("/raiseIssue", RAISEISSUE);
// VEHICLE.post("/findcar", FINDCAR);
// VEHICLE.post("/bookParking", BOOKPARKING);
// VEHICLE.post("/getParking", GETPARKING);

// EXPORTING ROUTER
module.exports = {
  VEHICLEROUTER: VEHICLE,
};
