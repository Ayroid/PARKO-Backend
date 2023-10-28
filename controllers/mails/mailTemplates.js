// MAIL TEMPLATES OBJECT
const templates = {
  LOGIN: {
    subject: "Your PARKO One-Time Password (OTP)",
    html: `
    Hi username,
    <br><br>
    Thank you for using Parko. We're sending you this One-Time Password (OTP) to verify your identity and ensure the security of your Parko account.
    <br><br>
    Here's your OTP: otpvalue
    <br><br>
    Please use this OTP to complete your login or verify your identity. Remember that this OTP is valid for a single use and will expire shortly.
    <br><br>
    Best regards,<br>
    The Parko Team
    `,
    // attachments: {
    //   filename: "BGMI Rules and Guidlines.pdf",
    //   path: "public/docs/mailAttachments/BGMI Rules and Guidlines.pdf",
    // },
  },
};

// ----------------------------------------------------------------

// CUSTOM TEMPLATING CONTROLLERS
const emailLoginOTP = (username, otpvalue) => {
  const template = templates.LOGIN;
  template.html = template.html.replace("username", username);
  template.html = template.html.replace("otpvalue", otpvalue);
  return template;
};

// ----------------------------------------------------------------

// EXPORTING MODULES
module.exports = { EMAILLOGINOTP: emailLoginOTP };
