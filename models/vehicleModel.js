// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const vehicleSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  parkingHistory: {
    type: Array,
    required: false,
  },
  // registered: {
  //   // Defines if vehicle is registered or not - RETHINK OVER IT
  //   type: Boolean,
  //   required: true,
  //   default: false,
  // },
  registeredOn: {
    type: Date,
    required: true,
  },
  lastUpdated: {
    type: Date,
    required: false,
  },
});

// CREATING MODEL
const vehicleModel = mongoose.model("vehicle", vehicleSchema);

// EXPORTING MODEL
module.exports = {
  VEHICLEMODEL: vehicleModel,
};
