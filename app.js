const express = require('express');
const morgan = require('morgan');
const cors = require('cors')


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
// const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// start express app
const app = express();

//   (1) middlewares
// implement cors
app.use(cors({
  origin: 'https://auth-app-2.shubhamdesai.repl.co'
}));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//  (3) Routes

// app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// middelware for unhandled routes

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// (4) server

module.exports = app;
