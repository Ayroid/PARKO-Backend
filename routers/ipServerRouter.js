const express = require("express");

// CONTROLLERS IMPORT
const {
  GETBOOKINGSTATUS,
  CONFIRMBOOKING,
  CANCELBOOKING,
} = require("../controllers/ipServerController");

// CREATING ROUTER
const IPSERVER = express.Router();

// IP SERVER ROUTES

IPSERVER.post("/getBookingStatus", GETBOOKINGSTATUS);
IPSERVER.post("/confirmBooking", CONFIRMBOOKING);
IPSERVER.post("/cancelBooking", CANCELBOOKING);

// EXPORTING ROUTER
module.exports = {
  IPSERVERROUTER: IPSERVER,
};
