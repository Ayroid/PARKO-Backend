// ----------------- MODULES IMPORT -----------------
const mongoose = require("mongoose");

// ----------------- CREATING SCHEMA -----------------
const vehicleSchema = new mongoose.Schema({
  ownerID: {
    type: String,
    required: true,
  },
  vehicleRegNumber: {
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
  registered: {
    // Defines if vehicle is registered or not
    type: Boolean,
    required: true,
    default: false,
  },
  registeredOn: {
    type: Date,
    required: true,
  },
});

// ----------------- CREATING MODEL -----------------
const vehicleModel = mongoose.model("vehicle", vehicleSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  VEHICLEMODEL: vehicleModel,
};
