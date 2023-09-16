// ----------------- MODULES IMPORT -----------------
const mongoose = require("mongoose");

// ----------------- CREATING SCHEMA -----------------
const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sapid: {
    type: Number,
    required: true,
  },
  Vehicles: {
    type: Array,
    required: false,
  },
  parkingHistory: {
    type: Array,
    required: false,
  },
});

// ----------------- CREATING MODEL -----------------
const vehicleModel = mongoose.model("vehicle", vehicleSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  VEHICLEMODEL: vehicleModel,
};
