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
  },
  currentlyParkedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  currentlyParkedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: false,
  },
  lastParkedVehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: false,
  },
});

// CREATING MODEL
const parkingSpotModel = mongoose.model("parkingspots", parkingSpotSchema);

// EXPORTING MODEL
module.exports = {
  PARKINGSPOTMODEL: parkingSpotModel,
};
