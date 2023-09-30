// IMPORTING MODULES
const { StatusCodes } = require("http-status-codes");

// CUSTOM MODULE IMPORTS

// IMPORTING DATABASE CONTROLLERS
const {
  READUSER,
  CREATEUSER,
  UPDATEUSER,
  DELETEUSER,
} = require("./db/userDatabase");
const { READOTP, CREATEOTP, DELETEOTP } = require("./db/otpDatabase");

// MAIL CONTROLLER
const { SENDMAIL } = require("./mails/mailController");
const { OTPGENERATOR } = require("./mails/optGenController");

// JWT CONTROLLER
const { GENERATETOKEN } = require("../middlewares/jwtAuthMW");

// ----------------------------------------------------------------

// REGISTER USER CONTROLLER
const registerUser = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const data = ({ username, phone, email, sapid } = req.body);

    // 2. CHECKING IF THE USER EXISTS
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

    // 3. CREATING FINAL DATA OBJECT
    const finaldata = { ...data, registeredOn: Date.now() };

    // 4. CREATING USER
    const created = await CREATEUSER(finaldata);

    // 5. SENDING USER
    if (created) {
      res.status(StatusCodes.CREATED).send({ userId: created._id });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Creating User! ❌");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Creating User! ❌");
  }
};

// ----------------------------------------------------------------

// LOGIN USER CONTROLLER
const loginUser = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { email } = req.body;

    // 2. CHECKING IF USER ALREADY EXIST OR NOT
    const user = await READUSER([{ email: email }]);

    // 3. IF USER EXIST , CHECK OTP
    if (user.length === 1) {
      const otpexist = await READOTP([{ email: email }]);

      // 4. IF OTP EXIST AND NOT EXPIRED
      if (otpexist.length > 0 && otpexist[0].expiryTime > Date.now()) {
        return res.status(StatusCodes.BAD_REQUEST).send("OTP Already Sent ✅");
      }

      //5. GENERATE OTP
      const otpValue = OTPGENERATOR();
      // SENDING OTP THROUGH MAIL
      SENDMAIL(user[0].username, email, otpValue);

      //6. CREATING OTP IN DATABASE
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
    // 7. Handling errors
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error Logging In! ❌");
  }
};

// const logOutUser = async (req,res) =>{
//   try{

//   } catch (error) {
//     console.log(error)
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error logging out ❌");
//   }
// }

// ----------------------------------------------------------------
// VERIFY OTP CONTROLLER
const verifyOTP = async (req, res) => {
  try {
    // 1. FETCHNG DATA FROM REQUEST BODY
    const { email, otpValue } = req.body;

    // 2. CHECKING IF OTP EXISTS
    const otpexist = await READOTP([{ email: email }]);

    // 3. FETCHING USER DATA
    const user = await READUSER([{ email: email }]);

    // 4. CHECKING IF OTP IS VALID
    if (otpexist.length !== 1) {
      return res.status(StatusCodes.NOT_FOUND).send("OTP Not Found ❌");
    }

    // 5. CHECKING IF OTP IS EXPIRED
    if (otpexist[0].expiryTime < Date.now()) {
      return res.status(StatusCodes.BAD_REQUEST).send("OTP Expired ❌");
    }
    // 6. CHECKING IF OTP IS CORRECT
    if (otpexist[0].otpValue !== otpValue) {
      return res.status(StatusCodes.BAD_REQUEST).send("OTP Incorrect ❌");
    }
    // 7. DELETING OTP FROM DATABASE
    await DELETEOTP({ email: email })
      .then((result) => {
        console.log("OTP Deleted ✅", result._id);
      })
      .catch((error) => {
        console.log("Error Deleting OTP ❌", error);
      });

    // 8. CREATING PAYLOAD
    const payload = {
      userId: user[0]._id,
    };

    // 9. CREATING TOKEN
    const token = GENERATETOKEN(payload, "36500d"); // 100 years
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
const readUser = async (req, res) => {
  /*

  SAMPLE QUERY OBJECT

  {
    "query": {
      "email": "email@email.com",
      "phone": 1234567890,
    }
  }

  */

  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    let { query } = req.body;

    // 2. CHECKING IF QUERY IS EMPTY
    if (query === undefined || query === null) {
      query = { _id: req.body.payload.userId };
    }

    // 2. CHECKING IF USER EXISTS
    const user = await READUSER([query]);

    // 3. SENDING RESPONSE
    if (user.length === 1) {
      res.status(StatusCodes.OK).send(user);
    } else {
      res.status(StatusCodes.NOT_FOUND).send("User Not Found ❌");
    }
  } catch (error) {
    // 4. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Getting User Details! ❌");
  }
};

// ----------------------------------------------------------------
// UPDATE USER DETAILS CONTROLLER
const updateUser = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query, data } = req.body;

    // 2. CHECKING IF QUERY IS EMPTY
    if (query === undefined || query === null) {
      query = { _id: req.body.payload.userId };
    } else {
      // 3. CHECKING IF USER EXISTS
      const user = await READUSER([query]);

      if (user.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send("User Not Found ❌");
      }

      // 4. FETCHING USER ID
      const userId = user[0]._id;

      // 5. CHECKING IF USER IS AUTHORIZED
      if (userId != req.body.payload.userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send("User Not Authorized ❌");
      }
    }

    // 6. UPDATING USER
    const updated = await UPDATEUSER(query, data);

    // 7. SENDING RESPONSE
    if (updated) {
      res.status(StatusCodes.OK).send(updated);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Updating User! ❌");
    }
  } catch (error) {
    // 8. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Updating User! ❌");
  }
};

// ----------------------------------------------------------------

// DELETE USER CONTROLLER
const deleteUser = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query } = req.body;

    // 2. CHECKING IF QUERY IS EMPTY
    if (query === undefined || query === null) {
      query = { _id: req.body.payload.userId };
    } else {
      // 3. CHECKING IF USER EXISTS
      const user = await READUSER([query]);
      if (user.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).send("User Not Found ❌");
      }

      // 4. CHECKING IF USER IS AUTHORIZED
      if (user[0]._id !== req.body.payload.userId) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .send("User Not Authorized ❌");
      }
    }

    // 5. DELETING USER
    const deleted = await DELETEUSER(query);

    // 6. SENDING RESPONSE
    if (deleted) {
      res.status(StatusCodes.OK).send("User Deleted ✅", deleted);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Deleting User! ❌");
    }
  } catch (error) {
    // 7. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Deleting User! ❌");
  }
};

// EXPORTING MODULES
module.exports = {
  LOGINUSER: loginUser,
  VERIFYOTP: verifyOTP,
  REGISTERUSER: registerUser,
  READUSER: readUser,
  UPDATEUSER: updateUser,
  DELETEUSER: deleteUser,
  // LOGOUTUSER : logOutUser,
};
