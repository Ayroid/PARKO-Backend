// ----------------- MODULES IMPORT -----------------
const mongoose = require("mongoose");

// ----------------- CREATING SCHEMA -----------------
const userParkingHistorySchema = new mongoose.Schema({
  vehicleID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: true,
  },
  ownerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  parkingNumber: {
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
  userParkingHistorySchema
);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  VEHICLEPARKINGHISTORYMODEL: vehicleParkingHistoryModel,
};
