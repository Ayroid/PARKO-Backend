// ----------------- MODULES IMPORT -----------------
const express = require("express");
const {
  LOGIN,
  REGISTER,
  GETUSERDETAILS,
  REGISTERVEHICLE,
} = require("../controller/userController");

const {
  GETPARKING,
  FINDCAR,
  BOOKPARKING,
  RAISEISSUE,
} = require("../controller/parkingController");

// ----------------- CREATING ROUTER -----------------
const USER = express.Router();

// ----------------- IMPORTING CONTROLLERS -----------------

// ----------------- API ENDPOINTS -----------------

USER.get("/register", (req, res) => {
  res.send("register");
});

//User routes
USER.post("/register", REGISTER);
USER.post("/login", LOGIN);
USER.post("/userDetails", GETUSERDETAILS);
USER.post("/registerVehicle", REGISTERVEHICLE);

//parking Routes
USER.post("/raise-issue", RAISEISSUE);
USER.post("/findcar", FINDCAR);
USER.post("/bookparking", BOOKPARKING);
USER.post("/getparking", GETPARKING);

// ----------------- EXPORTING ROUTER -----------------

module.exports = {
  USERROUTER: USER,
};
