// IMPORTING MODULES
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// CUSTOM MODULE IMPORTS

// IMPORTING DATABASE CONTROLLERS
const { READUSER, CREATEUSER } = require("./db/userDatabase");

// MAIL CONTROLLER
const { SENDMAIL } = require("./mails/mailController");

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
      SENDMAIL(user[0].username, email);
      return res.status(StatusCodes.OK).send("OTP Sent ✅");
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("User Not Registered ❌");
    }
  } catch (error) {
    // 6. Handling errors
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error Logging In! ❌");
  }

  // res.send("LoginUser");
  // const token = jwt.sign(
  //   { userId: user._id, name: user.username },
  //   process.env.JWT_SECRET,
  //   {
  //     expiresIn: "30d",
  //   }
  // );
};

// ----------------------------------------------------------------

// VERIFY OTP CONTROLLER

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
