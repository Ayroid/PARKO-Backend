// IMPORITNG MODULES
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";

// ROUTERS
import { USERROUTER } from "./routers/userRouter";
import { PARKINGSPOTROUTER } from "./routers/parkingSpotRouter";
import { VEHICLEROUTER } from "./routers/vehicleRouter";
import { IPSERVERROUTER } from "./routers/ipServerRouter";

// CUSTOM MODULES IMPORT
import { CONNECTDATABSE } from "./controllers/db/connectDatabase";

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
app.route("/api/test", (req, res) => {
  console.log("Server is working!", Date.now());
  return res.status(200).send("Server is working!");
});

// ROUTES
app.use("/api/user", USERROUTER);
app.use("/api/user/vehicle", VEHICLEROUTER);
app.use("/api/parkingspot", PARKINGSPOTROUTER);
app.use("/api/ipserver", IPSERVERROUTER);

// STARTING SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} ✅`);
});
