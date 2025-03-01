const { sendEmail } = require('../services/emailService');

const sendEmailController = async (req, res) => {
  const { to, subject, text, html } = req.body;
  try {
    const emailResponse = await sendEmail(to, subject, text, html);
    res.status(200).json({ message: 'Email enviado con éxito', info: emailResponse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendEmailController };