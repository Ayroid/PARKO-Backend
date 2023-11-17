// IMPORTING MODULES
const { StatusCodes } = require("http-status-codes");

// IMPORTING DATABASE CONTROLLERS
const {
  READVEHICLE,
  CREATEVEHICLE,
  UPDATEVEHICLE,
  DELETEVEHICLE,
} = require("./db/vehicleDatabase");

const { UPDATEUSER } = require("./db/userDatabase");

// REGISTER VEHICLE CONTROLLER
const registerVehicle = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const data = ({ brand, model, vehicleNumber } = req.body);

    // 2. CHECKING IF THE VEHICLE EXISTS
    const vehicle = await READVEHICLE([{ vehicleNumber: vehicleNumber }]);
    if (vehicle.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("Vehicle Already Exists! ❌");
    }

    // 3. FETCHING USER DATA
    const userdata = ({ userId: userId } = req.body.payload);

    // 4. EXTRA DATA OBJECT
    const extradata = {
      parkingHistory: [],
      registeredOn: Date.now(),
      lastUpdated: Date.now(),
    };

    // 5. CREATING FINAL DATA OBJECT
    const finaldata = { ...data, ...userdata, ...extradata };

    // 6. CREATING VEHICLE
    const created = await CREATEVEHICLE(finaldata);

    // 7. SENDING VEHICLE
    if (created) {
      // 8. LINKING VEHICLE TO USER
      const dataToUpdate = { $push: { vehicles: created._id } };
      const updated = await UPDATEUSER({ _id: userdata.userId }, dataToUpdate);

      // 9. SENDING VEHICLE
      if (updated) {
        res.status(StatusCodes.CREATED).send({ vehicleId: created._id });
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error Registering Vehicle! ❌");
      }
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Registering Vehicle! ❌");
    }
  } catch (error) {
    // 8. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Registering Vehicle! ❌");
  }
};

// READ VEHICLE CONTROLLER
const readVehicle = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    let { query } = req.body;

    // 2. CHECKING IF QUERY IS EMPTY & SETTING DEFAULT QUERY TO ALL USER VEHICLES
    if (query === undefined || query === null) {
      query = { userId: req.body.payload.userId };
    }

    // 3. CHECKING IF THE VEHICLE EXISTS
    const vehicle = await READVEHICLE([query]);
    if (vehicle.length > 0) {
      return res.status(StatusCodes.OK).send(vehicle);
    } else {
      return res.status(StatusCodes.NOT_FOUND).send("Vehicle Not Found! ❌");
    }
  } catch (error) {
    // 4. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Reading Vehicle! ❌");
  }
};

// UPDATE VEHICLE CONTROLLER
const updateVehicle = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query, data } = req.body;

    // 2. CHECKING IF THE VEHICLE EXISTS
    const vehicle = await READVEHICLE([query]);
    if (vehicle.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("Vehicle Not Found! ❌");
    }

    // 3. CHECKING IF THE USER IS AUTHORIZED
    if (vehicle[0].userId !== req.body.payload.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized! ❌");
    }

    // 4. UPDATING VEHICLE
    const updated = await UPDATEVEHICLE(query, data);

    // 5. SENDING VEHICLE
    if (updated) {
      res.status(StatusCodes.OK).send(updated);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Updating Vehicle! ❌");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Updating Vehicle! ❌");
  }
};

// DELETE VEHICLE CONTROLLER
const deleteVehicle = async (req, res) => {
  try {
    // 1. FETCHING DATA FROM REQUEST BODY
    const { query } = req.body;

    // 2. CHECKING IF THE VEHICLE EXISTS
    const vehicle = await READVEHICLE([query]);
    if (vehicle.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).send("Vehicle Not Found! ❌");
    }

    // 3. CHECKING IF THE USER IS AUTHORIZED
    if (vehicle[0].userId !== req.body.payload.userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Unauthorized! ❌");
    }

    // 4. DELETING VEHICLE
    const deleted = await DELETEVEHICLE(query);

    // 5. SENDING VEHICLE
    if (deleted) {
      res.status(StatusCodes.OK).send("Vehicle Deleted ✅", deleted);
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Error Deleting Vehicle! ❌");
    }
  } catch (error) {
    // 6. HANDLING ERRORS
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Error Deleting Vehicle! ❌");
  }
};

// EXPORTING MODULES
module.exports = {
  REGISTERVEHICLE: registerVehicle,
  READVEHICLE: readVehicle,
  UPDATEVEHICLE: updateVehicle,
  DELETEVEHICLE: deleteVehicle,
};
