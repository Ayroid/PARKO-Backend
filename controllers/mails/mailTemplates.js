// MAIL TEMPLATES OBJECT

const templates = {
  BGMI: {
    subject:
      "Confirmation of Registration - BGMI Event at Battlegrounds- Season 1",
    html: `
      Dear Participant,<br><br>
      We extend our sincerest gratitude for registering for the <strong>BGMI</strong> event at <strong>"Battlegrounds - Igniting the Spirit of Fierce Competition and Gaming Excellence"</strong>.
      Your decision to participate in our gaming extravaganza is deeply appreciated, and we eagerly await your esteemed presence.<br><br>
      As an esteemed participant, we want to ensure that you have all the necessary information to engage in the event smoothly. We are pleased to attach the official rules and regulations for the <strong>BGMI</strong> event. These guidelines have been carefully crafted to ensure fairness, sportsmanship, and a thrilling gaming experience for all participants.
      We kindly request you to review the document meticulously and acquaint yourself with the event's specifications.<br><br>
      If you encounter any queries or require any clarifications, please do not hesitate to reach out to our dedicated support team.<br><br>
      <strong>For any queries, feel free to contact:</strong><br><br>
      Yash Katiyaar (+91 6386 720 366)<br>
      Hitesh Matharu (+91 78889 33406)<br><br>
      Thank you for choosing to be a part of <strong>"Battlegrounds – Season 1"</strong>, and we look forward to witnessing your exemplary gaming skills and exceptional performance in the intense battlegrounds of BGMI.
      Wishing you the best of luck and success in your gaming endeavours.<br><br>
      <strong>With warm regards,</strong><br>
      <strong>Team UPES CSA</strong>`,
    attachments: {
      filename: "BGMI Rules and Guidlines.pdf",
      path: "public/docs/mailAttachments/BGMI Rules and Guidlines.pdf",
    },
  },
};

// EXPORTING MODULES

module.exports = { MAILTEMPLATES: templates };
