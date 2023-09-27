// using same parking route for get all parkings and get specific parking with query
const getParkingSpots = (req,res)=>{
    res.send('get parking spots')
}

const bookParkingSpots = (req,res)=>{
    res.send('book parking spot');
}

const raiseIssue = (req,res)=>{
    res.send('Raise Issue');
}

const findCar = (req,res) =>{
    res.send('find car');
}

module.exports = {
    GETPARKING : getParkingSpots,
    BOOKPARKING : bookParkingSpots,
    RAISEISSUE : raiseIssue,
    FINDCAR : findCar,
}