const passportConfig = {
  facebookConfig: {
    clientID: process.env.PASSPORT_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.PASSPORT_FACEBOOK_CLIENT_SECRET,
    callbackURL: `${process.env.EXPRESS_APP_LOCAL_URI}/auth/facebook/callback`,
  },
  googleConfig: {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.EXPRESS_APP_LOCAL_URI}/auth/google/callback`,
  },
};

module.exports = passportConfig;
