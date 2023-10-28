// IMPORTING DATABASE MODELS
const { USERMODEL } = require("../../models/userModel");

// DATABASE OPERATIONS

// READ USER
const readUser = (query) => {
  try {
    return new Promise((resovle, reject) => {
      USERMODEL.find({ $or: query })
        .then((result) => {
          if (result) {
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Reading User ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Reading User ❌", error);
  }
};

// CREATE USER
const createUser = (data) => {
  try {
    return new Promise((resovle, reject) => {
      const newUser = new USERMODEL(data);
      newUser
        .save()
        .then((result) => {
          if (result) {
            console.log(`User Created ✅ - {userId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Creating User ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Creating User ❌", error);
  }
};

// UPDATE USER
const updateUser = (query, data) => {
  try {
    return new Promise((resovle, reject) => {
      USERMODEL.findOneAndUpdate(query, data, { new: true }) // WHAT DOES NEW MEAN HERE? ANSWER: https://stackoverflow.com/questions/30419575/how-to-get-the-updated-document-after-mongoose-update
        .then((result) => {
          if (result) {
            console.log(`User Updated ✅ - {userId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Updating User ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Updating User ❌", error);
  }
};

// DELETE USER
const deleteUser = (query) => {
  try {
    return new Promise((resovle, reject) => {
      USERMODEL.findOneAndDelete(query)
        .then((result) => {
          if (result) {
            console.log(`User Deleted ✅ - {userId : ${result._id}}`);
            resovle(result);
          }
        })
        .catch((error) => {
          console.log("Error Deleting User ❌", error);
          reject(false);
        });
    });
  } catch (error) {
    console.log("Error Deleting User ❌", error);
  }
};

// EXPORTING MODULES
module.exports = {
  READUSER: readUser,
  CREATEUSER: createUser,
  UPDATEUSER: updateUser,
  DELETEUSER: deleteUser,
};
