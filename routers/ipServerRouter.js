const express = require("express");

// CONTROLLERS IMPORT
const {
  GETBOOKINGSTATUS,
  CONFIRMBOOKINGSTATUS,
  CANCELBOOKINGSTATUS,
  ADDCAMERAMAPPING,
} = require("../controllers/ipServerController");

// CREATING ROUTER
const IPSERVER = express.Router();

// IP SERVER ROUTES

IPSERVER.post("/addCameraMapping", ADDCAMERAMAPPING);
IPSERVER.post("/getBookingStatus", GETBOOKINGSTATUS);
IPSERVER.post("/confirmBooking", CONFIRMBOOKINGSTATUS);
IPSERVER.post("/cancelBooking", CANCELBOOKINGSTATUS);

// EXPORTING ROUTER
module.exports = {
  IPSERVERROUTER: IPSERVER,
};
