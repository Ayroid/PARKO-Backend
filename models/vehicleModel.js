// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const vehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  parkedAt: {
    type: String,
    required: false,
  },
  parkingHistory: {
    type: Array,
    required: false,
  },
  registeredOn: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedOn: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

// CREATING MODEL
const vehicleModel = mongoose.model("vehicle", vehicleSchema);

// EXPORTING MODEL
module.exports = {
  VEHICLEMODEL: vehicleModel,
};
