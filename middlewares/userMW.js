// USER DETAILS VERIFICATION CONTROLLER
const verifyUser = (req, res, next) => {
  const { username, phone, email, sapid } = req.body;
  if (!username || !email || !phone || !sapid) {
    return res.status(400).send("Mandatory fields cannot be empty!");
  }
  if (!phone.length === 10) {
    return res.status(400).send("Invalid Phone Number!");
  }
  if (!sapid.length === 9) {
    return res.status(400).send("Invalid SAPID!");
  }
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return res.status(400).send("Invalid Email!");
  }
  next();
};

// EXPORTING MODULES

module.exports = {
  VERIFYUSERMW: verifyUser,
};
