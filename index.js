// ----------------- IMPORITNG MODULES -----------------

require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// ----------------- CUSTOM MODULES IMPORT -----------------

// ----------------- CONNECTING TO DATABASE -----------------

// ----------------- CONSTANTS -----------------

const PORT = process.env.PORT || 3000;

// ----------------- INITIALIZING EXPRESS -----------------

const app = express();

// ----------------- SETTING UP STATIC FILES -----------------

app.use(express.static(path.join(__dirname, "public")));

// ----------------- SETTING UP BODY PARSER -----------------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ----------------- ROUTERS -----------------

// ----------------- ROUTES -----------------

// ----------------- STARTING SERVER -----------------

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
