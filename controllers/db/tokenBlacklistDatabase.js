// IMPORT DATABASE MODELS
const { TOKENBLACKLISTMODEL } = require("../../models/tokenBlacklistModel");

// ADD TOKEN TO BLACKLIST
const createBlackListToken = (data) => {
  return new Promise((resolve, reject) => {
    try {
      // 1. CREATING NEW TOKEN
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
    // 1. FETCHING DATA FROM REQUEST BODY
    if (typeof query === "string") {
      query = JSON.parse(query);
    }
    // 2. GETTING TOKEN
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

module.exports = {
  GETBLACKLISTTOKEN: getBlackListToken,
  CREATEBLACKLISTTOKEN: createBlackListToken,
};
