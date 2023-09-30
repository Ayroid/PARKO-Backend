// MODULES IMPORT
const express = require("express");

// CONTROLLERS IMPORT
const {
  LOGINUSER,
  VERIFYOTP,
  REGISTERUSER,
  GETUSER,
  UPDATEUSER,
  DELETEUSER,
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
USER.get("/test", (req, res) => {
  res.send("test");
});

// USER ROUTES
USER.post("/register", VERIFYUSERMW, REGISTERUSER);
USER.post("/login", LOGINUSER);
USER.post("/verify", VERIFYOTP);
USER.post("/getUser", VERIFYTOKEN, GETUSER);
USER.post("/updateUser", VERIFYTOKEN, UPDATEUSER);
USER.post("/deleteUser", VERIFYTOKEN, DELETEUSER);
// USER.post("/logout", LOGOUTUSER);

// PARKING ROUTES
USER.post("/raiseIssue", RAISEISSUE);
USER.post("/findcar", FINDCAR);
USER.post("/bookParking", BOOKPARKING);
USER.post("/getParking", GETPARKING);

// EXPORTING ROUTER
module.exports = {
  USERROUTER: USER,
};
