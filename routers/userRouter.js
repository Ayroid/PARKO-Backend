// ----------------- MODULES IMPORT -----------------
const express = require("express");
const {
  LOGIN,
  REGISTER,
  GETUSERDETAILS,
  REGISTERVEHICLE,
} = require("../controller/userController");

// ----------------- CREATING ROUTER -----------------
const USER = express.Router();

// ----------------- IMPORTING CONTROLLERS -----------------

// ----------------- API ENDPOINTS -----------------
USER.post("/register", REGISTER);
USER.post("/login", LOGIN);
USER.post("/userDetails", GETUSERDETAILS);
USER.post("/registerVehicle", REGISTERVEHICLE);

// ----------------- EXPORTING ROUTER -----------------

module.exports = {
  USERROUTER: USER,
};
