const login = async (req, res) => {
  res.send("Login");
};

const register =async (req, res) => {
  res.send("register");
};

const getUserDetails =async (req, res) => {
  res.send("user details");
};

const registerVehicle =async (req, res) => {
  res.send("register vehicle");
};

module.exports = {
  LOGIN: login,
  REGISTER: register,
  GETUSERDETAILS: getUserDetails,
  REGISTERVEHICLE: registerVehicle,
};
