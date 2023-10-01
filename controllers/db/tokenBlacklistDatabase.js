// IMPORT DATABASE MODELS
const { TOKENBLACKLISTMODEL } = require('../../models/tokenBlacklistModel');

// ADD TOKEN TO BLACKLIST
const blacklistToken = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const newUser = new TOKENBLACKLISTMODEL(data);
      newUser
        .save()
        .then((result) => {
          if (result) {
            console.log(`TOKEN BLACKLISTED ✅ - {tokenId: ${result._id}}`);
            resolve(result);
          }
        })
        .catch((error) => {
          console.log('Error BLACKLISTING TOKEN ❌', error);
          reject(false);
        });
    } catch (error) {
      console.log('Error BLACKLISTING TOKEN ❌', error);
      reject(false);
    }
  });
};

//CHECK IF TOKEN IS BLACKLISTED OR NOT
const isBlacklisted = (query) => {
    try {

        // Parse the query if it's a string
        if (typeof query === 'string') {
            query = JSON.parse(query);
        }

      return new Promise((resovle, reject) => {
        TOKENBLACKLISTMODEL.find({ $or: [query] }) // Wrap query in an array
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
  BLACKLISTTOKEN: blacklistToken,
  ISBLACKLISTED: isBlacklisted,
};
