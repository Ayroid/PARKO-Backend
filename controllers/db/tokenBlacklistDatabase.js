// IMPORT DATABASE MODELS
const { TOKENBLACKLISTMODEL } = require("../../models/tokenBlacklistModel");

// ADDING TOKEN TO BLACKLIST
const createBlackListToken = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const newToken = new TOKENBLACKLISTMODEL(data);
      newToken
        .save()
        .then((result) => {
          if (result) {
            console.log(`TOKEN BLACKLISTED ✅ - {tokenId: ${result._id}}`);
            resolve(result);
          }
        })
        .catch((error) => {
          console.log("Error BLACKLISTING TOKEN ❌", error);
          reject(false);
        });
    } catch (error) {
      console.log("Error BLACKLISTING TOKEN ❌", error);
      reject(false);
    }
  });
};

//CHECK IF TOKEN IS BLACKLISTED OR NOT
const getBlackListToken = (query) => {
  try {
    return new Promise((resovle, reject) => {
      TOKENBLACKLISTMODEL.find({ $or: [query] })
        .then((result) => {
          if (result) {
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Reading BlackListed Token ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Reading BlackListed Token ❌", error);
  }
};

// EXPORTING FUNCTIONS
module.exports = {
  GETBLACKLISTTOKEN: getBlackListToken,
  CREATEBLACKLISTTOKEN: createBlackListToken,
};
