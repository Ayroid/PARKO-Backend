// MODULES IMPORT
require("dotenv").config();
const jwt = require("jsonwebtoken");

// ---------------------------- FUNCTIONS ----------------------------

// CREATING ACCESS TOKEN VIA PAYLOAD
const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "86400s",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "2592000s",
  });
  return { token, refreshToken };
};

// CHECKING ACCESS TOKEN
const checkAccessToken = async (token, tokenType) => {
  try {
    // 1. VERIFY THE TOKEN
    let payload = null;
    if (tokenType === "token") {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } else if (tokenType === "refreshToken") {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    }
    return payload;
  } catch (error) {
    // 2. HANDLE ERROR
    return false;
  }
};

// ---------------------------- MIDDLEWARES ----------------------------

// VERIFYING ACCESS TOKEN
const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ msg: "User Unauthorized!" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log("Error Verifying Token ❌");
        return res.status(403).json({ msg: "User Unauthorized!" });
      } else {
        req.payload = data;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "User Unauthorized!" });
  }
};

module.exports = {
  GENERATETOKEN: generateAccessToken,
  CHECKTOKEN: checkAccessToken,
  VERIFYTOKEN: verifyAccessToken,
};
