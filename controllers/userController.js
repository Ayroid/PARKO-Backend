// IMPORTING MODULES
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// CUSTOM MODULE IMPORTS

// IMPORTING DATABASE CONTROLLERS
const { READUSER, CREATEUSER } = require("./db/userDatabase");

// MAIL CONTROLLER
const { SENDMAIL } = require("./mails/mailController");

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
      SENDMAIL(email, "BGMI");
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
