// MODULES IMPORT
require("dotenv").config();
const jwt = require("jsonwebtoken");

//IMPORT DB-CONTROLLER FOR CHECKING BLACKLISTED CONTROLLER
const {
  GETBLACKLISTTOKEN,
} = require("../controllers/db/tokenBlacklistDatabase");

const { StatusCodes } = require("http-status-codes");

// CREATING ACCESS TOKEN
const generateAccessToken = (payload, tokenExpiry) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: tokenExpiry,
  });
};

const verifyAccessToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  const blackListed = await GETBLACKLISTTOKEN({ token: token });

  if (blackListed.length > 0) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Token Expired! ");
  } else if (token) {
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

module.exports = {
  GENERATETOKEN: generateAccessToken,
  VERIFYTOKEN: verifyAccessToken,
};
