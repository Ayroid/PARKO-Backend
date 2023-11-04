// DOT ENV CONFIGURATION
require("dotenv").config();

// NODEMAILER CONFIGURATION
const nodemailer = require("nodemailer");

// MAIL CONFIGURATION
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USERNAME = process.env.MAIL_USERNAME;
const MAIL_PASSWORD = process.env.MAIL_PASSWORD;

// MAIL TEMPLATES
const { EMAILLOGINOTP } = require("./mailTemplates");

// NODEMAILER TRANSPORTER
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
  secure: true,
});

// SEND MAIL FUNCTION
const sendMail = async (username, email, otpValue, emailType) => {
  try {
    let MAIL_TEMPLATE = EMAILLOGINOTP(emailType);
    let MAIL_SUBJECT = MAIL_TEMPLATE.subject;
    let MAIL_HTML = MAIL_TEMPLATE.html;

    MAIL_HTML = MAIL_HTML.replace("username", username.trim());
    MAIL_HTML = MAIL_HTML.replace("otpvalue", otpValue);

    const mailOptions = {
      from: MAIL_USERNAME,
      to: email,
      // cc : MAIL_USERNAME,
      // bcc : MAIL_USERNAME,
      subject: MAIL_SUBJECT,
      html: MAIL_HTML,
      //   attachments: MAIL_TEMPLATE.attachments,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.accepted + " Sent ✅");
      }
    });
  } catch (err) {
    console.log("Error in sending mail ❌" + err);
  }
};

// EXPORTING MODULES
module.exports = {
  SENDMAIL: sendMail,
};
