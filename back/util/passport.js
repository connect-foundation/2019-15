const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { facebookConfig, googleConfig } = require('../config/passportConfig');
const models = require('../db/models');

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
    const [users, isCreated] = await models.users.findOrCreate({
      where: {
        user_id: profile.id,
      },
      defaults: {
        nickname: 'foo',
      },
    });
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
    const [users, isCreated] = await models.users.findOrCreate({
      where: {
        user_id: profile.id,
      },
      defaults: {
        nickname: 'foo',
      },
    });
    return done(null, { id: profile.id, displayName: profile.displayName });
  }),
);

module.exports = passport;
