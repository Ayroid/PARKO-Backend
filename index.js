// ----------------- IMPORITNG MODULES -----------------
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// ----------------- CUSTOM MODULES IMPORT -----------------
const { CONNECTDATABSE } = require("./controllers/db/connectDatabase");

// ----------------- CONNECTING TO DATABASE -----------------
CONNECTDATABSE();

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
const { USERROUTER } = require("./routers/userRouter");

// ----------------- ROUTES -----------------
app.use("/user", USERROUTER);

// ----------------- STARTING SERVER -----------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
