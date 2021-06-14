const createError = require('http-errors');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/login');
  }
}

function notAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  } else {
    next();
  }
}

function isManager(req, res, next) {
  if (req.user && req.user.userType === 2) {
    return next();
  }
  next(createError(403));
}

module.exports = {
  isAuthenticated,
  notAuthenticated,
  isManager
}