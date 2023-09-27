// using same parking route for get all parkings and get specific parking with query
const getParkingSpots = async (req, res) => {
  res.send("get parking spots");
};

const bookParkingSpots = async (req, res) => {
  res.send("book parking spot");
};

const raiseIssue = async (req, res) => {
  res.send("Raise Issue");
};

const findCar = async (req, res) => {
  res.send("find car");
};

module.exports = {
  GETPARKING: getParkingSpots,
  BOOKPARKING: bookParkingSpots,
  RAISEISSUE: raiseIssue,
  FINDCAR: findCar,
};
