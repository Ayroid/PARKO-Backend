// ----------------- IMPORITNG MODULES -----------------
require('dotenv').config();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// ----------------- CUSTOM MODULES IMPORT -----------------

// ----------------- CONNECTING TO DATABASE -----------------
const connectDB = require('./db/connect');

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
app.use('/user',USERROUTER);

// ----------------- STARTING SERVER -----------------

const start = async () =>{
  try{


    const url = process.env.MONGO_URI;

    await connectDB(url);
    app.listen(PORT,()=>{
      console.log(`Server is running on port ${PORT}`);
    })

  }catch(error){
      console.log(error);
  }
}

start();
