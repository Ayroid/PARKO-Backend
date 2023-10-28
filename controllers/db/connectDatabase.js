// DOT ENV CONFIGURATION
require("dotenv").config();

// ------------------------------------------------------------------------------

// IMPORTING MODULES
const mongoose = require("mongoose");

// ------------------------------------------------------------------------------

// DATABASE CONFIGURATION
const connectDatabase = async () => {
  try {
    DATABASE_URL = process.env.DATABASE_URL;
    DATABASE_USERNAME = process.env.DATABASE_USERNAME;
    DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
    DATABASE_STRING = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}/?retryWrites=true&w=majority`;
    await mongoose
      .connect(DATABASE_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database Connected ✅");
      })
      .catch((error) => {
        console.error("Database Connection Error ❌", error);
      });
  } catch (error) {
    console.log("Database Connection Error ❌", error);
  }
};

// ------------------------------------------------------------------------------

// EXPORTING MODULE
module.exports = { CONNECTDATABSE: connectDatabase };
