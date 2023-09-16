// ----------------- MODULES IMPORT -----------------
const express = require("express");

// ----------------- CREATING ROUTER -----------------
const USER = express.Router();

// ----------------- IMPORTING CONTROLLERS -----------------

// ----------------- API ENDPOINTS -----------------
USER.post('/register')

// ----------------- EXPORTING ROUTER -----------------

module.exports = {
  USERROUTER: USER,
};
