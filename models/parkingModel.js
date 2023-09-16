// ----------------- MODULES IMPORT -----------------
const mongoose = require("mongoose");

// ----------------- CREATING SCHEMA -----------------
const parkingSchema = new mongoose.Schema({
  parkingNumber: {
    type: String,
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    long: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    required: true,
  },
  currentlyParked: {
    type: String, // vehicleID
    required: true,
  },
  lastParked: {
    type: String, // vehicleID
    required: false,
  },
});

// ----------------- CREATING MODEL -----------------
const parkingModel = mongoose.model("parking", parkingSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  PARKINGMODEL: parkingModel,
};
