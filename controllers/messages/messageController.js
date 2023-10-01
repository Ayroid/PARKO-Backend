// DOT ENV CONFIGURATION
require("dotenv").config();

// IMPORTING MODULES
const { StatusCodes } = require("http-status-codes");
const twilio = require("twilio");

// CUSTOM MODULE IMPORTS
const { SMSLOGINOTP } = require("./messageTemplates");

// SMS CONFIGURATION

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// SEND SMS FUNCTION

const sendSMS = async (phone, otpValue) => {
  try {
    const messageBody = SMSLOGINOTP(otpValue).body;
    const message = await client.messages.create({
      body: messageBody,
      from: TWILIO_PHONE_NUMBER,
      to: phone,
    });
    console.log(message.sid + " Sent ✅");
  } catch (error) {
    console.log(error);
  }
};

// EXPORTING MODULES

module.exports = {
  SENDSMS: sendSMS,
};
