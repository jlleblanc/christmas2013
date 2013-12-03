var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  // bcrypt = require('bcrypt'),
  model = require('./model');

// Configure Passport
passport.use(new LocalStrategy(
  function(username, password, done) {
    model.find_user(username, function  (user) {
      if (!user) {
        return done(null, false, { message: 'Unknown user' });
      }

      if (password == user.password) {
        return done(null, user);
      }

      return done(null, false, { message: 'Invalid credentials' });
    });
  }
));

// Registration
passport.register = function(username, password, done) {
  // Check if a username is registered
  model.find_user(username, function  (user) {
    if (user) {
      console.log('user already registered');
      return false;
    }

    // Create the user document and save
    model.create_user(username, password, function () {
      done();
    });

  });
};

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  model.find_user(username, function  (user) {
    done(null, user);
  });
});

module.exports = passport;