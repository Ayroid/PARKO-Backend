// ----------------- MODULES IMPORT -----------------
const mongoose = require("mongoose");

// ----------------- CREATING SCHEMA -----------------
const userSchema = new mongoose.Schema({
  username: {
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
  profilePic: {
    type: String,
    required: false,
    default: "-",
  },
  vehicles: {
    type: Array,
    required: false,
    default: [],
  },
  parkingHistory: {
    type: Array,
    required: false,
    default: [],
  },
  registeredOn: {
    type: Date,
    required: true,
  },
});

// ----------------- CREATING MODEL -----------------
const userModel = mongoose.model("user", userSchema);

// ----------------- EXPORTING MODEL -----------------
module.exports = {
  USERMODEL: userModel,
};