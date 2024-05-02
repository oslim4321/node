const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "adewaleselim6@gmail.com",
    pass: "mjsx lymg gpmh jtuq",
  },
});

const sendWelcomeEmail = ({ name, email }) => {
  console.log(name, email);
  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome ${name}</title>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
    }
    .email-wrapper {
        background-color: #ffffff;
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .email-header {
        background-color: #007bff;
        color: #ffffff;
        padding: 10px;
        text-align: center;
    }
    .email-body {
        padding: 20px;
        text-align: center;
    }
    .email-footer {
        text-align: center;
        padding: 10px;
        font-size: 12px;
        color: #666;
    }
</style>
</head>
<body>
<div class="email-wrapper">
    <div class="email-header">
        <h1>Welcome to Our Website!</h1>
    </div>
    <div class="email-body">
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for joining us! We are excited to have you on board and look forward to serving you.</p>
        <p>Please let us know if you have any questions or need further information.</p>
    </div>
    <div class="email-footer">
        Best regards,<br>
        The Team at SQI ICT COLLEGE
    </div>
</div>
</body>
</html>
`;

  const mailOptions = {
    from: "adewaleselim6@gmail.com",
    to: email,
    subject: "Welcome to our website",
    html,
  };

  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const sendProductCreatedSuccess = () => {};

module.exports = {
  sendWelcomeEmail,
};
