const { StatusCodes } = require('http-status-codes');
const  {PARKINGMODEL} = require('../models/parkingModel');
const { READSPOTDETAILS, CREATESPOT } = require('./db/spotDatabase');

const createNewParkingSpot= async (req,res)=>{
    try{
        // 1. Fetching data from request body
        const data = ({parkingNumber,location,createdAt,lastParked,currentlyParked} = req.body);

        // 2. Checking if parkingspot already exist
        const spot = await READSPOTDETAILS([
            {parkingNumber:parkingNumber},
            {location:location},
            {lastParked:lastParked},
            {currentlyParked:currentlyParked},
        ]);
        if (spot.length === 1 ){ //spot exists
            return res
                .status(StatusCodes.BAD_GATEWAY)
                .send("Spot is Already Mapped ! ❌");
        }

        // 3. creating final data object
        const finaldata = {...data, createdAt:Date.now()};

        // 4. Creating Stop
        const created = await CREATESPOT(finaldata);

        // 5. Sending response
        if(created){
            res.status(StatusCodes.CREATED).send({created:created});
        }else{
            res
              .status(StatusCodes.INTERNAL_SERVER_ERROR)
              .send("Error Creating Spot ! ❌")
        }

    }catch(error){
        // 6. handing errors
        console.log(error);
        res 
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error Creating Spot ! ❌");

    }
}

const getAllSpots = async (req,res) =>{
    try{
        const spots = await PARKINGMODEL.find();
        res.status(StatusCodes.OK).send({spots});

    }catch(error){
        console.log(error);
        res 
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send("Error Getting All Parking Spots! ❌");
    }
}


const updateParkingSpotStatus= async (req,res)=>{
    
    res.send('Update parking Spot status');
}

const deleteParkingSpot = async (req,res)=>{
    try{

        const spotId = req.params.id;

        //check if the spot with the provided ID exists
        const spot = await PARKINGMODEL.findById(spotId);
        if(!spot){
            return res.status(StatusCodes.NOT_FOUND).send('Parking Spot not Found ! ❌');
        }
        
        //delete the parking spot
        await PARKINGMODEL.findByIdAndDelete(spotId);
        
        res.status(StatusCodes.NO_CONTENT).send('Parking spot deleted Sucessfully! ✅ ');
    }catch(error){
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error Deleting parking Spot! ❌');
    }
}

const editParkingSpot=async (req,res)=>{
    res.send("Route for editing Parking Spot Details")
}

module.exports = {
    CREATENEWPARKINGSPOT:createNewParkingSpot,
    UPDATEPARKINGSPOTSTATUS : updateParkingSpotStatus,
    DELETEPARKINGSPOT : deleteParkingSpot,
    EDITPARKINGSPOT: editParkingSpot,
    GETALLSPOTS:getAllSpots
}