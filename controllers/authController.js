var crypto = require('crypto');
var nodemailer = require('nodemailer');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const sendMail = require('./../utils/email')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
var date = new Date();
var mail = {
            "id": user.id,
            "created": date.toString()
            }

const token_mail_verification = jwt.sign(mail, config.jwt_secret_mail, { expiresIn: '1d' });

var url = config.baseUrl + "verify?id=" + token_mail_verification;
  

  let info = await transporter.sendMail({
        from: 'desai99150@gmail.com', // sender address
        to: user.email, // list of receivers seperated by comma
        subject: "Account Verification", // Subject line
        text: "Click on the link below to veriy your account " + url, // plain text body
    }, (error, info) => {

        if (error) {
            console.log(error)
            return;
        }
        console.log('Message sent successfully!');
        console.log(info);
        transporter.close();
    });
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  }); 

  
});

exports.verified = catchAsync(async(req, res, next) => {
  token = req.query.id;
    if (token) {
        
            jwt.verify(token, config.jwt_secret_mail, (e, decoded) => {
                if (e) {
                    console.log(e)
                    return res.sendStatus(403)
                } else {
                    id = decoded.id;

                
//Update your database here with whatever the verification flag you are using 



                }

            });
        
    } else {
        return res.sendStatus(403)

    }
});




exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exists
  if (!email || !password) {
    return next(new AppError('please provide a email and password', 400));
  }
  // check if user exists&& password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //check if everything ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

