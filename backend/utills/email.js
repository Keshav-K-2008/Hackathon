// Email utility - sends emails to beneficiaries
const nodemailer = require('nodemailer');

// Create email transporter (uses Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail app password
  }
});

// Function to send legacy notification email
const sendLegacyEmail = async (beneficiaryEmail, beneficiaryName, assetTitle) => {
  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: beneficiaryEmail,
    subject: 'Digital Legacy Notification',
    html: `
      <h2>Digital Death Locker - Legacy Notification</h2>
      <p>Dear ${beneficiaryName},</p>
      <p>A legacy item has been shared with you.</p>
      <p><strong>Asset: ${assetTitle}</strong></p>
      <p>This is an automated notification from the Digital Death Locker system.</p>
      <br>
      <p>Best regards,</p>
      <p>Digital Death Locker Team</p>
    `
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${beneficiaryEmail}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

module.exports = { sendLegacyEmail };