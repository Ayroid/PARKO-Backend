// IMPORTING MODULES
const crypto = require("crypto");

// ----------------------------------------------------------------

// OTP GENERATOR
function otpGenerator() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number

  const randomBytes = crypto.randomBytes(4); // Generate 4 random bytes
  const randomNumber = parseInt(randomBytes.toString("hex"), 16); // Convert bytes to an integer
  return (randomNumber % (max - min + 1)) + min;
}

// ----------------------------------------------------------------

// EXPORTING MODULES
module.exports = {
  OTPGENERATOR: otpGenerator,
};
