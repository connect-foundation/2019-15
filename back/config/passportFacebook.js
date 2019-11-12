const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializeUser');
  done(null, user);
});

// 로그인
passport.use(
  'facebookLogin',
  new FacebookStrategy(
    {
      clientID: '908799682853437',
      clientSecret: 'ac888fd30b5c40195dd8e1622ce04dfc',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
    },
    async function(accessToken, refreshToken, profile, done) {
      console.log('facebookLoginStrategy', accessToken, refreshToken, profile);
      return done(null, profile);
    },
  ),
);

module.exports = passport;
