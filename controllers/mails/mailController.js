// DOT ENV CONFIGURATION
require("dotenv").config();

// NODEMAILER CONFIGURATION
const nodemailer = require("nodemailer");

// CUSTOM MODULES IMPORT
const { OTPGENERATOR } = require("./optGenController");
const { READOTP, CREATEOTP, DELETEOTP } = require("../db/otpDatabase");

// MAIL CONFIGURATION
let MAIL_HOST = process.env.MAIL_HOST;
let MAIL_PORT = process.env.MAIL_PORT;
let MAIL_USERNAME = process.env.MAIL_USERNAME;
let MAIL_PASSWORD = process.env.MAIL_PASSWORD;

// MAIL TEMPLATES
const { LOGINOTP } = require("./mailTemplates");

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
const sendMail = async (username, email) => {
  try {
    const otpValue = OTPGENERATOR();
    const MAIL_TEMPLATE = LOGINOTP(username, otpValue);
    const MAIL_SUBJECT = MAIL_TEMPLATE.subject;
    const MAIL_HTML = MAIL_TEMPLATE.html;

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
        console.log(info.accepted + " Sent");

        // CREATING OTP IN DATABASE
        await CREATEOTP({
          email: email,
          otpValue: otpValue,
          issueTime: Date.now(),
          expiryTime: Date.now() + 600000,
        })
          .then((result) => {
            console.log("OTP Created ✅", result._id);
          })
          .catch((error) => {
            console.log("Error Creating OTP ❌", error);
          });
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
