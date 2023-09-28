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

const { VERIFYUSERMW } = require("../middlewares/usermw");

// CREATING ROUTER
const USER = express.Router();

// API ENDPOINTS

USER.get("/register", (req, res) => {
  res.send("register");
});

//User routes
USER.post("/register", VERIFYUSERMW, REGISTERUSER);
USER.post("/login", LOGINUSER);
USER.post("/verify",VERIFYOTP);
USER.post("/userDetails", GETUSERDETAILS);
USER.post("/registerVehicle", REGISTERVEHICLE);

//parking Routes
USER.post("/raise-issue", RAISEISSUE);
USER.post("/findcar", FINDCAR);
USER.post("/bookparking", BOOKPARKING);
USER.post("/getparking", GETPARKING);

// EXPORTING ROUTER

module.exports = {
  USERROUTER: USER,
};
