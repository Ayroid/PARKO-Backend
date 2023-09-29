// MODULES IMPORT
const express = require("express");

// CONTROLLERS IMPORT
const {
  LOGINUSER,
  VERIFYOTP,
  REGISTERUSER,
  GETUSERDETAILS,
  REGISTERVEHICLE,
} = require("../controllers/userController");

const {
  GETPARKING,
  FINDCAR,
  BOOKPARKING,
  RAISEISSUE,
} = require("../controllers/parkingController");

// MIDDLEWARES IMPORT
const { VERIFYUSERMW } = require("../middlewares/userMW");

// JWT IMPORT
const { VERIFYTOKEN } = require("../middlewares/jwtAuthMW");

// CREATING ROUTER
const USER = express.Router();

// API ENDPOINTS
USER.get("/register", (req, res) => {
  res.send("register");
});

// USER ROUTES
USER.post("/register", VERIFYUSERMW, REGISTERUSER);
USER.post("/login", LOGINUSER);
// USER.post("/logout", LOGOUTUSER);
USER.post("/verify",VERIFYOTP);
USER.post("/userDetails", GETUSERDETAILS);
USER.post("/registerVehicle", REGISTERVEHICLE);

// PARKING ROUTES
USER.post("/raiseIssue", RAISEISSUE);
USER.post("/findcar", FINDCAR);
USER.post("/bookParking", BOOKPARKING);
USER.post("/getParking", GETPARKING);

// EXPORTING ROUTER

module.exports = {
  USERROUTER: USER,
};
