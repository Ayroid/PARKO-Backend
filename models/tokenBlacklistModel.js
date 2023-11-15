// MODULES IMPORT
const mongoose = require("mongoose");

// CREATING SCHEMA
const tokenBlackListSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    required: true,
  },
});

//CREATING MODEL
const tokenBlackListModel = mongoose.model("blacklist", tokenBlackListSchema);

//EXPORTING MODEL
module.exports = {
  TOKENBLACKLISTMODEL: tokenBlackListModel,
};
