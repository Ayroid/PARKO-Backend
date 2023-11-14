// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const parkingSpotSchema = new mongoose.Schema({
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
    required: false,
  },
  lastParked: {
    type: String, // vehicleID
    required: false,
  },
});

// CREATING MODEL
const parkingSpotModel = mongoose.model("parkingspots", parkingSpotSchema);

// EXPORTING MODEL
module.exports = {
  PARKINGSPOTMODEL: parkingSpotModel,
};
