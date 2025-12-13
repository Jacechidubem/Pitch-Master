const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Create a Transporter
  // For development, we often use a fake service like Ethereal or Gmail
  // If using Gmail, you need an "App Password" (not your login password)
  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USERNAME, // We will set this in .env
      pass: process.env.EMAIL_PASSWORD, // We will set this in .env
    },
  });

  // 2. Define Email Options
  const mailOptions = {
    from: `"Pitch Master Support" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.message, // Use HTML for nicer looking emails
  };

  // 3. Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;