const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dotenv = require('dotenv');
require('express-async-errors');

dotenv.config();

const app = express();

// view engine setup
const handlebars = require("express-handlebars");
const hbs = handlebars.create({
  defaultLayout: "layout",
  layoutsDir: __dirname + "/views",
  extname: ".hbs",
  helpers: {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    }
  }
});
// app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", hbs.engine);
// app.set('view engine', 'hbs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/room.route');
// const reservationsRouter = require('./routes/reservation.route');
// const customerRouter = require('./routes/customers.route');
// const receiptRouter = require('./routes/receipt.route');
const statisticRouter = require("./routes/statistic.route");

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
// app.use('/reservations', reservationsRouter);
app.use('/statistics', statisticRouter);
// app.use('/customers', customerRouter);
// app.use('/receipts', receiptRouter);

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
  res.render('error');
});

module.exports = app;
