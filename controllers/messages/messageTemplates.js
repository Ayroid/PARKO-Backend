// MAIL TEMPLATES OBJECT
const templates = {
  LOGIN: {
    body: "Your PARKO Login OTP is: otpvalue",
  },
};

// ----------------------------------------------------------------

// CUSTOM TEMPLATING CONTROLLERS
const smsLoginOTP = (otpvalue) => {
  const template = templates.LOGIN;
  template.body = template.body.replace("otpvalue", otpvalue);
  return template;
};

// ----------------------------------------------------------------

// EXPORTING MODULES
module.exports = { SMSLOGINOTP: smsLoginOTP };
