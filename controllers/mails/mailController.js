// DOT ENV CONFIGURATION
require("dotenv").config();

// NODEMAILER CONFIGURATION
const nodemailer = require("nodemailer");

// MAIL CONFIGURATION
let MAIL_HOST = process.env.MAIL_HOST;
let MAIL_PORT = process.env.MAIL_PORT;
let MAIL_USERNAME = process.env.MAIL_USERNAME;
let MAIL_PASSWORD = process.env.MAIL_PASSWORD;

// MAIL TEMPLATES
const { MAILTEMPLATES } = require("./mailTemplates");

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
const sendMail = async (email, template) => {
  try {
    const MAIL_TEMPLATE = MAILTEMPLATES[template];
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

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info.accepted + " Sent");
      }
    });
  } catch (err) {
    console.log("Error in sending mail: " + err);
  }
};

// EXPORTING MODULES

sendMail("ayroids@gmail.com", "BGMI");

module.exports = {
  SENDMAIL: sendMail,
};
