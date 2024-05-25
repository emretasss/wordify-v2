// server.js (Express.js)
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  // Kullanıcı e-posta kontrolü yapılabilir (örneğin, veritabanında)
  // Kullanıcıya şifre sıfırlama bağlantısı gönderme
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Şifre Sıfırlama',
    text: 'Şifre sıfırlama bağlantınızı kullanarak şifrenizi sıfırlayın: http://your-app.com/reset-password',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Şifre sıfırlama e-postası gönderildi!');
  });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});