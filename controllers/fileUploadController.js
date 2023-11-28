// IMPORTING MODULES
const multer = require("multer");
const path = require("path");

/* FILE UPLOAD FUNCTIONS */

// FILE DESTINATION MAPPING
const fileDestionationMapping = (fileName) => {
  try {
    const fileDestionationMap = {
      profilePic: "public/img/profilePic",
    };
    return fileDestionationMap[fileName];
  } catch (error) {
    console.log(error);
  }
};

// FILE NAME MAPPING
const filenameMapping = (req, fileName, fileExtension) => {
  try {
    const fileNameMap = {
      profilePic: `${req.payload.userId}${fileExtension}`,
    };
    return fileNameMap[fileName];
  } catch (error) {
    console.log(error);
  }
};

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDestionationMapping(file.fieldname));
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    cb(null, filenameMapping(req, file.fieldname, fileExtension));
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB in bytes
  },
});

// MULTER UPLOAD
const upload = multer({ storage: storage });

// EXPORTING FUNCTIONS
module.exports = {
  UPLOAD: upload,
};
