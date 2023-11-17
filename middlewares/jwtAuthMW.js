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

// CREATE ACCESS TOKEN VIA REFRESH TOKEN
const generateAccessTokenViaRefreshToken = (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "86400s",
  });
  return token;
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
  } catch (err) {
    // 2. HANDLE ERROR
    return false;
  }
};

// ---------------------------- MIDDLEWARES ----------------------------

// VERIFYING ACCESS TOKEN
const verifyAccessToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.sendStatus(403).json({ msg: "User Unauthorized ❌" });
      } else {
        req.body.payload = data;
        next();
      }
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403).json({ msg: "User Unauthorized ❌" });
  }
};

module.exports = {
  GENERATETOKEN: generateAccessToken,
  GENERATETOKENVIAREFRESHTOKEN: generateAccessTokenViaRefreshToken,
  CHECKTOKEN: checkAccessToken,
  VERIFYTOKEN: verifyAccessToken,
};
