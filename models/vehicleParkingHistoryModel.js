// ----------------- MODULES IMPORT -----------------
const mongoose = require("mongoose");

// ----------------- CREATING SCHEMA -----------------
const vehicleParkingHistorySchema = new mongoose.Schema({
  vehicleID: {
    type: String,
    required: true,
  },
  ownerID: {
    type: String,
    required: true,
  },
  parkingNumber: {
    // Parking String that defines the parking location
    type: Number,
    required: true,
  },
  timeIn: {
    type: Date,
    required: true,
  },
  timeOut: {
    type: Date,
    required: false,
  },
});

// ----------------- CREATING MODEL -----------------
const vehicleParkingHistoryModel = mongoose.model(
  "vehicleParkingHistory",
  vehicleParkingHistorySchema
);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  VEHICLEPARKINGHISTORYMODEL: vehicleParkingHistoryModel,
};
