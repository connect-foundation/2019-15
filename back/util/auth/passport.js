const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { facebookConfig, googleConfig } = require('../../config/passportConfig');
const logInOrSignUp = require('./logInOrSignUp');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// 페이스북 로그인
passport.use('facebookLogin', new FacebookStrategy(facebookConfig, logInOrSignUp));

// 구글 로그인
passport.use('googleLogin', new GoogleStrategy(googleConfig, logInOrSignUp));

module.exports = passport;
