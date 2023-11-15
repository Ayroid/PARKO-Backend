// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: true,
  },
  updatedOn: {
    type: Date,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: false,
  },
});

// CREATING MODEL
const vehicleModel = mongoose.model("vehicle", vehicleSchema);

// EXPORTING MODEL
module.exports = {
  VEHICLEMODEL: vehicleModel,
};
