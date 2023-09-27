// ----------------- MODULES IMPORT -----------------
const express = require("express");
const {
  LOGINUSER,
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

// ----------------- CREATING ROUTER -----------------
const USER = express.Router();

// ----------------- IMPORTING CONTROLLERS -----------------

// ----------------- API ENDPOINTS -----------------

USER.get("/register", (req, res) => {
  res.send("register");
});

//User routes
USER.post("/register", REGISTERUSER);
USER.post("/login", LOGINUSER);
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
