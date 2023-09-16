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
