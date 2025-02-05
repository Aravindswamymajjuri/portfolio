const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'aravindswamymajjuri143@gmail.com', // Your email
    pass: 'nrcf tqzx psjg ezjq', // Your email password or app password
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: 'your_email@example.com',
    to: 'aravindswamymajjuri143@gmail.com', // Recipient email
    subject: 'New Contact Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
