const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/auth.controller");

// render login page
router.get("/login", authController.renderLoginPage);

// post login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

// post logout
router.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/auth/login');
});

module.exports = router;