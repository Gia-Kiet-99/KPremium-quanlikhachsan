const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// custom config
const hbs = require("./config/hbs.config");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require('./config/passport');
require('dotenv').config();
require('express-async-errors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/room.route');
const reservationsRouter = require('./routes/reservation.route');
const customerRouter = require('./routes/customers.route');
const receiptRouter = require('./routes/receipt.route');
const statisticRouter = require("./routes/statistic.route");
const authRouter = require("./routes/auth.route");
const {isAuthenticated} = require("./middlewares/auth.mdw");

const app = express();
// view engine setup
app.engine("hbs", hbs.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport middleware
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Pass req.user to res.locals
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// routing
app.use('/auth', authRouter);
app.use('/', isAuthenticated, indexRouter);
app.use('/users', isAuthenticated, usersRouter);
app.use('/rooms', isAuthenticated, roomsRouter);
app.use('/reservations', isAuthenticated, reservationsRouter);
app.use('/statistics', isAuthenticated, statisticRouter);
app.use('/customers', isAuthenticated, customerRouter);
app.use('/receipts', isAuthenticated, receiptRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    status: err.status,
    message: err.message
  });
});

module.exports = app;
