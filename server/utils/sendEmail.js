const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Use explicit settings instead of just service: 'gmail'
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Try 465 (Secure SSL) first. If this fails, we will try 587.
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Add connection timeout setting (10 seconds)
    connectionTimeout: 10000, 
  });

  const mailOptions = {
    from: `"Pitch Master Support" <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;