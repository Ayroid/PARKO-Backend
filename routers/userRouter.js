// ----------------- MODULES IMPORT -----------------
const express = require("express");
const {login,register,getUserDetails,registerVehicle} = require('../controller/userController')

// ----------------- CREATING ROUTER -----------------
const USER = express.Router();

// ----------------- IMPORTING CONTROLLERS -----------------

// ----------------- API ENDPOINTS -----------------
USER.post('/register',register);
USER.post('/login',login);
USER.post('/userDetails',getUserDetails);
USER.post('/registerVehicle',registerVehicle);

// ----------------- EXPORTING ROUTER -----------------

module.exports = {
  USERROUTER: USER,
};
