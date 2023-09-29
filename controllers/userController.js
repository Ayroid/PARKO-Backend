// IMPORTING MODULES
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// CUSTOM MODULE IMPORTS

// IMPORTING DATABASE CONTROLLERS
const { READUSER, CREATEUSER } = require("./db/userDatabase");
const { READOTP, CREATEOTP, DELETEOTP } = require("./db/otpDatabase");

// MAIL CONTROLLER
const { SENDMAIL } = require("./mails/mailController");
const { OTPGENERATOR } = require("./mails/optGenController");

// JWT CONTROLLER
const {
  GENERATETOKEN,
  VERIFYTOKEN,
  DELETETOKEN,
} = require("../middlewares/jwtAuthMW");

// ----------------------------------------------------------------

// REGISTER USER CONTROLLER
const registerUser = async (req, res) => {
  try {
    // 1. Fetching data from request body
    const data = ({ username, phone, email, sapid } = req.body);

    // 2. Checking if user already exists
    const user = await READUSER([
      { phone: phone },
      { email: email },
      { sapid: sapid },
    ]);
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("User Already Exists! ❌");
    }

    // 3. Creating final data object
    const finaldata = { ...data, registeredOn: Date.now() };

    // 4. Creating user
    const created = await CREATEUSER(finaldata);

    // 5. Sending response
    if (created) {
      res.status(StatusCodes.CREATED).send({ userId: created._id });
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

// LOGIN USER CONTROLLER
const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await READUSER([{ email: email }]);

    if (user.length === 1) {
      const otpexist = await READOTP([{ email: email }]);

      if (otpexist.length > 0 && otpexist[0].expiryTime > Date.now()) {
        return res.status(StatusCodes.BAD_REQUEST).send("OTP Already Sent ✅");
      }

      const otpValue = OTPGENERATOR();

      SENDMAIL(user[0].username, email, otpValue);

      // CREATING OTP IN DATABASE
      await CREATEOTP({
        email: email,
        otpValue: otpValue,
        issueTime: Date.now(),
        expiryTime: Date.now() + 600000,
      })
        .then((result) => {
          console.log("OTP Created ✅", result._id);
        })
        .catch((error) => {
          console.log("Error Creating OTP ❌", error);
        });

      return res.status(StatusCodes.OK).send("OTP Sent ✅");
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("User Not Registered ❌");
    }
  } catch (error) {
    // 6. Handling errors
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error Logging In! ❌");
  }
};

// ----------------------------------------------------------------

// VERIFY OTP CONTROLLER

const verifyOTP = async (req, res) => {
  try {
    // 1. FETCHNG DATA FROM REQUEST BODY
    const { email, otpValue } = req.body;

    // 2. CHECKING IF OTP EXISTS
    const otpexist = await READOTP([{ email: email }]);

    // 3. CHECKING IF OTP IS VALID
    if (otpexist.length !== 1) {
      return res.status(StatusCodes.NOT_FOUND).send("OTP Not Found ❌");
    }
    // 4. CHECKING IF OTP IS EXPIRED
    if (otpexist[0].expiryTime > Date.now()) {
      return res.status(StatusCodes.BAD_REQUEST).send("OTP Expired ❌");
    }
    // 5. CHECKING IF OTP IS CORRECT
    if (otpexist[0].otpValue === otpValue) {
      return res.status(StatusCodes.BAD_REQUEST).send("OTP Incorrect ❌");
    }
    // 6. DELETING OTP FROM DATABASE
    await DELETEOTP({ email: email })
      .then((result) => {
        console.log("OTP Deleted ✅", result._id);
      })
      .catch((error) => {
        console.log("Error Deleting OTP ❌", error);
      });
    // 7. CREATING TOKEN
    const token = GENERATETOKEN({ email: email }, "36500d"); // 100 years
    return res.status(StatusCodes.OK).send({ token: token });
  } catch (error) {
    // 10. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Verifying OTP! ❌");
  }
};

// ----------------------------------------------------------------

// GET USER DETAILS CONTROLLER
const getUserDetails = async (req, res) => {};

// REGISTER VEHICLE CONTROLLER
const registerVehicle = async (req, res) => {
  res.send("register vehicle");
};

// EXPORTING MODULES
module.exports = {
  LOGINUSER: loginUser,
  VERIFYOTP: verifyOTP,
  REGISTERUSER: registerUser,
  GETUSERDETAILS: getUserDetails,
  REGISTERVEHICLE: registerVehicle,
};
