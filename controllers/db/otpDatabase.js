// IMPORTING DATABASE MODELS
const { OTPMODEL } = require("../../models/otpModel");

// DATABASE OPERATIONS

// READ OTP
const readOTP = (query) => {
  try {
    return new Promise((resovle, reject) => {
      OTPMODEL.find({ $or: query })
        .then((result) => {
          if (result) {
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Reading OTP ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Reading OTP ❌", error);
  }
};

// CREATE OTP
const createOTP = (data) => {
  try {
    return new Promise((resovle, reject) => {
      const newOTP = new OTPMODEL(data);
      newOTP
        .save()
        .then((result) => {
          if (result) {
            console.log(`OTP Created ✅ - {OTPId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Creating OTP ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Creating OTP ❌", error);
  }
};

// DELETE OTP
const deleteOTP = (query) => {
  try {
    return new Promise((resovle, reject) => {
      USERMODEL.findOneAndDelete(query)
        .then((result) => {
          if (result) {
            console.log(`User Deleted ✅ - {userId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Deleting User ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Deleting User ❌", error);
  }
};

// EXPORTING MODULES

module.exports = {
  READOTP: readOTP,
  CREATEOTP: createOTP,
  DELETEOTP: deleteOTP,
};
