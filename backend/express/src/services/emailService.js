const transporter = require('../config/emailConfig');

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    return info;
  } catch (error) {
    throw new Error(`Error al enviar el email: ${error.message}`);
  }
};

module.exports = { sendEmail };