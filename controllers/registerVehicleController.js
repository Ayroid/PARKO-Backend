// IMPORTING MODULES
const { StatusCodes } = require("http-status-codes");

// REGISTER VEHICLE CONTROLLER
const registerVehicle = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const data = ({ vehicleNumber, model } = req.body);

    // 2. FETCHING USER DATA
    const userdata = ({ userId } = req.body.payload);

    // 3. EXTRA DATA OBJECT
    const extradata = {
      parkingHistory: [],
      registeredOn: Date.now(),
      lastUpdated: Date.now(),
    };

    // 4. CREATING FINAL DATA OBJECT
    const finaldata = { ...data, ...userdata, ...extradata };

    // 5. CREATING VEHICLE


  } catch (error) {
    // 4. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Registering Vehicle! ❌");
  }
};
