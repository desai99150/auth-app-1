const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const sendMail = async options =>{
  const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const mailOptions = {
  from: 'desai99150@gmail.com',
  to: options.email,
  subject: options.subject,
  text: options.message,
  // html:
};

await transporter.sendmail(mailoptions)
};

module.exports = sendMail;
//   var date = new Date();
// var mail = {
//             "id": user.id,
//             "created": date.toString()
//             }

// const token_mail_verification = jwt.sign(mail, config.jwt_secret_mail, { expiresIn: '1d' });

// var url = config.baseUrl + "verify?id=" + token_mail_verification;
// let transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "1057efd4beb1f1",
//     pass: "6fe791bec061f7"
//   }
// });

// let info = await transporter.sendMail({
//         from: 'desai99150@gmail.com', // sender address
//         to: user.email, // list of receivers seperated by comma
//         subject: "Account Verification", // Subject line
//         text: "Click on the link below to veriy your account " + url, // plain text body
//     }, (error, info) => {

//         if (error) {
//             console.log(error)
//             return;
//         }
//         console.log('Message sent successfully!');
//         console.log(info);
//         transporter.close();
//     });}