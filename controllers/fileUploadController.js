// IMPORTING MODULES
const multer = require("multer");
const path = require("path");

// ------------------------------------------------------------------------------

/* FILE UPLOAD FUNCTIONS */

// FILE 

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "resume") {
      cb(null, "public/img/screenshots/resume");
    } else if (file.fieldname === "transactionSS") {
      cb(null, "public/img/screenshots/transactionSS");
    }
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    let filename = "";
    if (file.fieldname === "resume") {
      filename = `${req.body.personalEmail}${fileExtension}`;
    } else if (file.fieldname === "transactionSS") {
      filename = `${req.body.personalEmail}${fileExtension}`;
    }
    cb(null, filename);
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB in bytes
  },
});

// ------------------------------------------------------------------------------

// MULTER UPLOAD
const upload = multer({ storage: storage });

// ------------------------------------------------------------------------------

// EXPORTING FUNCTIONS
module.exports = {
  UPLOAD: upload,
};
