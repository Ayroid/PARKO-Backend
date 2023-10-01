// IMPORTING DATABASE MODELS
const { PARKINGMODEL } = require("../../models/parkingModel");

// DATABASE OPERATIONS

// READ USER
const readSpot = (query) => {
  try {
    return new Promise((resovle, reject) => {
      PARKINGMODEL.find({ $or: query })
        .then((result) => {
          if (result) {
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Reading User ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Reading User ❌", error);
  }
};

// CREATE USER
const createSpot = (data) => {
  try {
    return new Promise((resovle, reject) => {
      const newUser = new PARKINGMODEL(data);
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
  READSPOT: readSpot,
  CREATESPOT: createSpot,
};
