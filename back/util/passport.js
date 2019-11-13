const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { facebookConfig, googleConfig } = require('../config/passportConfig');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// 페이스북 로그인
passport.use(
  'facebookLogin',
  new FacebookStrategy(facebookConfig, async function(
    accessToken,
    refreshToken,
    profile,
    done,
  ) {
    // todo: need to retrieve from db
    return done(null, { id: profile.id, displayName: profile.displayName });
  }),
);

// 구글 로그인
passport.use(
  'googleLogin',
  new GoogleStrategy(googleConfig, async function(
    accessToken,
    refreshToken,
    profile,
    done,
  ) {
    // todo: need to retrieve from db
    return done(null, { id: profile.id, displayName: profile.displayName });
  }),
);

module.exports = passport;
