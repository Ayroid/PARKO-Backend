// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const parkingSpotSchema = new mongoose.Schema({
  parkingNumber: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Array,
    required: true,
  },
  nearBy: {
    type: String,
    required: true,
  },
  parkingStatus: {
    type: String,
    required: true,
    default: "available",
  },
  currentlyParkedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
    default: null,
  },
  currentlyParkedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: false,
    default: null,
  },
  lastParkedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: false,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: false,
  },
});

// CREATING MODEL
const parkingSpotModel = mongoose.model("parkingspots", parkingSpotSchema);

// EXPORTING MODEL
module.exports = {
  PARKINGSPOTMODEL: parkingSpotModel,
};
