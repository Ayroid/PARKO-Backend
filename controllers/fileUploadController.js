// IMPORTING MODULES
const multer = require("multer");
const path = require("path");

/* FILE UPLOAD FUNCTIONS */

// FILE DESTINATION MAPPING
const fileDestionationMapping = (fileName) => {
  const fileDestionationMap = {
    profilePic:
      "/home/ayroid/Documents/Projects/Parko/MINOR-APIServer/public/img/profilePIc",
    transactionSS: "/public/img/screenshots/transactionSS",
  };
  return fileDestionationMap[fileName];
};

// FILE NAME MAPPING
const filenameMapping = (req, fileName, fileExtension) => {
  const fileNameMap = {
    profilePic: `${req.body.email}${fileExtension}`,
    transactionSS: `${req.body.email}${fileExtension}`,
  };
  return fileNameMap[fileName];
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
