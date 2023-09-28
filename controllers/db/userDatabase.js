// IMPORTING MODULES
const mongoose = require("mongoose");

// IMPORTING DATABASE MODELS
const { USERMODEL } = require("../../models/userModel");

// DATABASE OPERATIONS
const createUser = (data) => {
  try {
    return new Promise((resovle, reject) => {
      const newUser = new USERMODEL(data);
      newUser
        .save()
        .then((result) => {
          if (result) {
            console.log(`User Created ✅ - {userId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Creating User ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Creating User ❌", error);
  }
};

// EXPORTING MODULES

module.exports = {
  CREATEUSER: createUser,
};
