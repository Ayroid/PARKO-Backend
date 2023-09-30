// MODULES IMPORT
require("dotenv").config();
const jwt = require("jsonwebtoken");

//IMPORT DB-CONTROLLER FOR CHECKING BLACKLISTED CONTROLLER
const {ISBLACKLISTED} = require('../controllers/db/tokenBlacklistDatabase');
const { StatusCodes } = require("http-status-codes");

// CREATING ACCESS TOKEN
const generateAccessToken = (payload, tokenExpiry) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: tokenExpiry,
  });
};

const verifyAccessToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.sendStatus(403).json({ msg: "No Valid Token Provided" });
      } else {
        req.body.payload = data;
        next();
      }
    });
  } else {
    return res.status(401).json({ msg: "No Valid Token Provided" });
  }
};

// const deleteAccessToken = (req, res) => {
//   refreshTokens = refreshTokens.filter(
//     (token) => token !== req.body.refreshToken
//   );
//   res.send("Logout Successful");
// };

const checkTokenBlacklist = async (req,res,next)=>{
  const token = req.headers["authorization"];

  const blacklist = await ISBLACKLISTED(
    {token:token});
  
  if(blacklist){
    res.status(StatusCodes.UNAUTHORIZED).send("Token Revoked, Please re-authenticate ");
  }

  next();
}

module.exports = {
  GENERATETOKEN: generateAccessToken,
  VERIFYTOKEN: verifyAccessToken,
  CHECKTOKENBLACKLIST : checkTokenBlacklist
  // DELETETOKEN: deleteAccessToken,
};
