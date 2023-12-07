// IMPORITNG MODULES
require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// CUSTOM MODULES IMPORT
const { CONNECTDATABSE } = require("./controllers/db/connectDatabase");

// CONNECTING TO DATABASE
CONNECTDATABSE();

// CONSTANTS
const PORT = process.env.PORT || 3000;

// INITIALIZING EXPRESS
const app = express();

// SETTING UP STATIC FILES
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/img", express.static(path.join(__dirname, "public/img")));

// SETTING UP BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// SETTING UP CORS
app.use(cors());

// TEST ROUTE
app.post("/api/test", (req, res) => {
  console.log("Server is working!", Date.now());
  return res.status(200).send("Server is working!");
});

app.get("/api/test", (req, res) => {
  console.log("Server is working!", Date.now());
  return res.status(200).send("Server is working!");
});

// ROUTERS
const { USERROUTER } = require("./routers/userRouter");
const { PARKINGSPOTROUTER } = require("./routers/parkingSpotRouter");
const { VEHICLEROUTER } = require("./routers/vehicleRouter");
const { IPSERVERROUTER } = require("./routers/ipServerRouter");

// ROUTES
app.use("/api/user", USERROUTER);
app.use("/api/user/vehicle", VEHICLEROUTER);
app.use("/api/parkingspot", PARKINGSPOTROUTER);
app.use("/api/ipserver", IPSERVERROUTER);

// STARTING SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
