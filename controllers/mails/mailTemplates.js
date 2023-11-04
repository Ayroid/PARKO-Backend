// MAIL TEMPLATES OBJECT
const templates = {
  REGISTRATION: {
    subject: "Registration Successful",
    html: `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #1e1e1e;
          margin: 0;
          padding: 0;
          font-size: 16px;
        }
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #1e1e1e;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #0070c0;
        }
        p {
          line-height: 1.6;
          color: #ffffff;
        }
      </style>
    </head>
    <body>
    <div class="container">
      <h1>Thank You for Registering with Parko</h1>
      <p>
        Hi username,
        <br><br>
        Thank you for registering with Parko! Your registration is complete, and you can now enjoy our parking services.
        <br><br>
        If you have any questions or need assistance, our support team is here to help.
        <br><br>
        Best regards,<br>
        The Parko Team
      </p>
    </div>
    </body>
    </html>`,
    // attachments: {
    //   filename: "BGMI Rules and Guidlines.pdf",
    //   path: "public/docs/mailAttachments/BGMI Rules and Guidlines.pdf",
    // },
  },
  LOGIN: {
    subject: "Your PARKO One-Time Password (OTP)",
    html: `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #1e1e1e;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #1e1e1e;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #0070c0;
        }
        p {
          line-height: 1.6;
          color: #ffffff;
        }
        .otpValue {
          font-weight: bold;
          font-size: 1.2em;
          color: #0070c0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your PARKO One-Time Password (OTP)</h1>
        <p>
          Hi username,
          <br><br>
          Thank you for using Parko. We're sending you this One-Time Password (OTP) to verify your identity and ensure the security of your Parko account.
          <br><br>
          Here's your OTP: <span class ="otpValue">otpvalue</span>
          <br><br>
          Please use this OTP to complete your login or verify your identity. Remember that this OTP is valid for a single use and will expire shortly.
          <br><br>
          Best regards,<br>
          The Parko Team
        </p>
      </div>
    </body>
    </html>
    `,
  },
};

// CUSTOM TEMPLATING CONTROLLERS
const emailLoginOTP = (emailType) => {
  const template = templates[`${emailType}`];
  return template;
};

// EXPORTING MODULES
module.exports = { EMAILLOGINOTP: emailLoginOTP };
