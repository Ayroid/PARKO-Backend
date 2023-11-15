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
  currentlyParked: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicle",
    required: false,
  },
  lastParked: {
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
