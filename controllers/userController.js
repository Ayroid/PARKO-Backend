const { USERMODEL } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const loginUser = async (req, res) => {
  res.send("LoginUser");
};

const registerUser = async (req, res) => {
  const { name, phone, email, sapid } = req.body;

  if (!name || !email || !phone || !sapid) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("Please provide email,name,phone and sapid");
  }

  const tempUser = { name, email, sapid, phone, registeredOn: Date.now() };
  const user = await USERMODEL.create({ ...tempUser });

  //generating jwt token and signing payload
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  res.status(StatusCodes.CREATED).send({ user: { name: user.name }, token });
};

const getUserDetails = async (req, res) => {
  res.send("user details");
};

const registerVehicle = async (req, res) => {
  res.send("register vehicle");
};

module.exports = {
  LOGINUSER: loginUser,
  REGISTERUSER: registerUser,
  GETUSERDETAILS: getUserDetails,
  REGISTERVEHICLE: registerVehicle,
};
