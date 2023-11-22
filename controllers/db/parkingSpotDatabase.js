// IMPORTING DATABASE MODELS
const { PARKINGSPOTMODEL } = require("../../models/parkingSpotModel");

// DATABASE OPERATIONS

// READ SPOT
const readSpot = (query, fields) => {
  try {
    return new Promise((resolve, reject) => {
      PARKINGSPOTMODEL.find({ $or: query })
        .select(fields)
        .then((result) => {
          if (result) {
            resolve(result);
          }
        })
        .catch((error) => {
          console.log("Error Reading Parking Spot ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Reading Parking Spot ❌", error);
  }
};

// CREATE SPOT
const createSpot = (data) => {
  try {
    return new Promise((resolve, reject) => {
      const newSpot = new PARKINGSPOTMODEL(data);
      newSpot
        .save()
        .then((result) => {
          if (result) {
            console.log(`Parking Spot Created ✅ - {spotId : ${result._id}}`);
            resolve(result);
          }
        })
        .catch((error) => {
          console.log("Error Creating Parking Spot ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Creating Parking Spot ❌", error);
  }
};

// UPDATE SPOT
const updateSpot = (query, data) => {
  try {
    return new Promise((resolve, reject) => {
      PARKINGSPOTMODEL.findOneAndUpdate(query, data, { new: true })
        .then((result) => {
          if (result) {
            console.log(`Parking Spot Updated ✅ - {spotId : ${result._id}}`);
            console.log(result);
            resolve(result);
          }
        })
        .catch((error) => {
          console.log("Error Updating Parking Spot ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Updating Parking Spot ❌", error);
  }
};

// DELETE SPOT
const deleteSpot = (query) => {
  try {
    return new Promise((resolve, reject) => {
      PARKINGSPOTMODEL.findOneAndDelete(query)
        .then((result) => {
          if (result) {
            console.log(`Parking Spot Deleted ✅ - {spotId : ${result._id}}`);
            resolve(result);
          }
        })
        .catch((error) => {
          console.log("Error Deleting Parking Spot ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Deleting Parking Spot ❌", error);
  }
};

// EXPORTING MODULES
module.exports = {
  READSPOT: readSpot,
  CREATESPOT: createSpot,
  UPDATESPOT: updateSpot,
  DELETESPOT: deleteSpot,
};
