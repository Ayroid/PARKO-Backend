// MODULES IMPORT
require("dotenv").config();
const jwt = require("jsonwebtoken");

// CREATING ACCESS TOKEN
function generateAccessToken(payload, tokenExpiry) {
  return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {
    expiresIn: tokenExpiry,
  });
}

function verifyAccessToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, data) => {
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
}

function deleteAccessToken(req, res) {
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.body.refreshToken
  );
  res.send(204);
}

module.exports = {
  GENERATETOKEN: generateAccessToken,
  VERIFYTOKEN: verifyAccessToken,
  DELETETOKEN: deleteAccessToken,
};
