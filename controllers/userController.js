// IMPORTING MODULES
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// CUSTOM MODULE IMPORTS
const { USERMODEL } = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");

// IMPORTING DATABASE CONTROLLERS
const { CREATEUSER } = require("./db/userDatabase");

// CONTROLLERS

// LOGIN USER CONTROLLER
const loginUser = async (req, res) => {
  res.send("LoginUser");
  const token = jwt.sign(
    { userId: user._id, name: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

// ----------------------------------------------------------------

// REGISTER USER CONTROLLER
const registerUser = async (req, res) => {
  try {
    // 1. Fetching data from request body
    const data = ({ username, phone, email, sapid } = req.body);

    // 2. Checking if user already exists

    // 3. Creating final data object
    const finaldata = { ...data, registeredOn: Date.now() };

    // 4. Creating user
    const user = await CREATEUSER(finaldata);

    // 5. Sending response
    if (user) {
      res.status(StatusCodes.CREATED).send({ userId: user._id });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Creating User! ❌");
    }
  } catch (error) {
    // 6. Handling errors
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Creating User! ❌");
  }
};

// ----------------------------------------------------------------

// GET USER DETAILS CONTROLLER
const getUserDetails = async (req, res) => {
  res.send("user details");
};

// REGISTER VEHICLE CONTROLLER
const registerVehicle = async (req, res) => {
  res.send("register vehicle");
};

// EXPORTING MODULES
module.exports = {
  LOGINUSER: loginUser,
  REGISTERUSER: registerUser,
  GETUSERDETAILS: getUserDetails,
  REGISTERVEHICLE: registerVehicle,
};
