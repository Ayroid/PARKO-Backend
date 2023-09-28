

const createNewParkingSpot= async (req,res)=>{
    res.send('Create new parking spot');
}

const updateParkingSpotStatus= async (req,res)=>{
    res.send('Update parking Spot status');
}

const deleteParkingSpot = async (req,res)=>{
    res.send('Delete Parking Spot');
}

const editParkingSpot=async (req,res)=>{
    res.send("Route for editing Parking Spot Details")
}

module.exports = {
    CREATENEWPARKINGSPOT:createNewParkingSpot,
    UPDATEPARKINGSPOTSTATUS : updateParkingSpotStatus,
    DELETEPARKINGSPOT : deleteParkingSpot,
    EDITPARKINGSPOT: editParkingSpot,
}