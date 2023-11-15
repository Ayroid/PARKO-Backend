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

const checkAccessToken = async (token) => {
  try {
    // 1. CHECK IF TOKEN IS BLACKLISTED
    const blackListed = await GETBLACKLISTTOKEN({ token: token });

    // 2. IF TOKEN IS BLACKLISTED THEN RETURN FALSE
    if (blackListed.length > 0) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Token Expired! ");
    } else if (token) {
      // 3. IF TOKEN IS NOT BLACKLISTED THEN VERIFY THE TOKEN
      jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          return false;
        } else {
          return true;
        }
      });
    } else {
      // 4. IF TOKEN IS NOT PROVIDED THEN RETURN FALSE

      return false;
    }
  } catch (err) {
    // 5. HANDLE ERROR
    return false;
  }
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
  CHECKTOKEN: checkAccessToken,
};
