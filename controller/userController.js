const login =(req,res)=>{
    res.send('Login');
}

const register = (req,res)=>{
    res.send('register');
}

const getUserDetails = (req,res)=>{
    res.send('user details');
}

const registerVehicle = (req,res)=>{
    res.send('register vehicle');
}

module.exports = {login,register,getUserDetails,registerVehicle};