// MODULES IMPORT
const express = require("express");
const { StatusCodes } = require("http-status-codes");

// CONTROLLERS IMPORT
const {
  REGISTERUSER,
  LOGINUSERMAIL,
  VERIFYOTPMAIL,
  LOGINUSERPHONE,
  VERIFYOTPPHONE,
  VERIFYJWTTOKEN,
  REFRESHJWTTOKEN,
  READUSER,
  UPDATEUSER,
  DELETEUSER,
  LOGOUTUSER,
  UPLOADPROFILEPIC,
} = require("../controllers/userController");

// MIDDLEWARES IMPORT
const { VERIFYUSERMW } = require("../middlewares/userMW");

// FILE UPLOAD CONTROLLER IMPORT
const { UPLOAD } = require("../controllers/fileUploadController");

// JWT IMPORT AND BLACKLIST CHECK IMPORT
const { VERIFYTOKEN } = require("../middlewares/jwtAuthMW");

// CREATING ROUTER
const USER = express.Router();
var SAPIDS = new Array();

// API ENDPOINTS
USER.get("/test", (req, res) => {
  res.status(StatusCodes.OK).send("Server is working ✅");
});

USER.post("/test", (req, res) => {
  res.status(StatusCodes.OK).send("Server is working ✅");
});

// USER ROUTES
USER.post("/register", VERIFYUSERMW, REGISTERUSER);
USER.post("/login/mail", LOGINUSERMAIL);
USER.post("/verify/mail", VERIFYOTPMAIL);
USER.post("/login/phone", LOGINUSERPHONE);
USER.post("/verify/phone", VERIFYOTPPHONE);
USER.post("/verify/token", VERIFYJWTTOKEN);
USER.post("/refreshToken", REFRESHJWTTOKEN);
USER.post("/getUser", VERIFYTOKEN, READUSER);
USER.post(
  "/updateUser",
  VERIFYTOKEN,
  UPDATEUSER
);
USER.post(
  "/updateProfilePic",
  VERIFYTOKEN,
  UPLOAD.fields([{ name: "profilePic", maxCount: 1 }]),
  UPLOADPROFILEPIC
);
USER.post("/deleteUser", VERIFYTOKEN, DELETEUSER);
USER.post("/logout", VERIFYTOKEN, LOGOUTUSER);
USER.post("/update", (req, res) => {
  const { sapid } = req.body;
  SAPIDS.push([sapid, Date.now()]);
  console.log(sapid);
  res.send("Updated!");
});
USER.post("getUpdate", (req, res) => {
  res.send(SAPIDS[SAPIDS.length - 1]);
});

// PARKING ROUTES
// USER.post("/raiseIssue", RAISEISSUE);
// USER.post("/findcar", FINDCAR);
// USER.post("/bookParking", BOOKPARKING);
// USER.post("/getParking", GETPARKING);

// EXPORTING ROUTER
module.exports = {
  USERROUTER: USER,
};
