// IMPORTING DATABASE MODELS
const { VEHICLEMODEL } = require("../../models/vehicleModel");

// DATABASE OPERATIONS

// READ USER
const readVehicle = (query) => {
  try {
    return new Promise((resovle, reject) => {
      VEHICLEMODEL.find({ $or: query })
        .then((result) => {
          if (result) {
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Reading Vehicle ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Reading Vehicle ❌", error);
  }
};

// CREATE USER
const createVehicle = (data) => {
  try {
    return new Promise((resovle, reject) => {
      const newUser = new VEHICLEMODEL(data);
      newUser
        .save()
        .then((result) => {
          if (result) {
            console.log(`Vehicle Created ✅ - {vehiclerId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Creating Vehicle ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Creating Vehicle ❌", error);
  }
};

// UPDATE USER
const updateVehicle = (query, data) => {
  try {
    return new Promise((resovle, reject) => {
      VEHICLEMODEL.findOneAndUpdate(query, data, { new: true })
        .then((result) => {
          if (result) {
            console.log(`Vehicle Updated ✅ - {vehicleId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Updating Vehicle ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Updating Vehicle ❌", error);
  }
};

// DELETE USER
const deleteVehicle = (query) => {
  try {
    return new Promise((resovle, reject) => {
      VEHICLEMODEL.findOneAndDelete(query)
        .then((result) => {
          if (result) {
            console.log(`Vehicle Deleted ✅ - {vehicleId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Deleting Vehicle ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Deleting Vehicle ❌", error);
  }
};

// EXPORTING MODULES

module.exports = {
  READVEHICLE: readVehicle,
  CREATEVEHICLE: createVehicle,
  UPDATEVEHICLE: updateVehicle,
  DELETEVEHICLE: deleteVehicle,
};
