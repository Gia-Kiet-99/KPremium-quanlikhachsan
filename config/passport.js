const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const userModel = require('../models/user.model');

passport.use(new LocalStrategy(
  async function (username, password, done) {
    console.log(username, password);
    const user = await userModel.checkCredential(username, password);
    console.log("-------------------------------------------------")
    console.log(user);

    if (!user) {
      return done(null, false, {message: 'Incorrect username or password'});
    }
    return done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.getById(id)
    .then(user => {
      done(null, {username: user.username, userType: user.user_type});
    })
});


module.exports = passport;