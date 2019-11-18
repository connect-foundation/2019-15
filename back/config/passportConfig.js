const { EXPRESS_URI } = require('../config/uri');

const tmpStrs = EXPRESS_URI.split(':');
const tmpStr = `${tmpStrs[0]}:${tmpStrs[1]}.xip.io:${tmpStrs[2]}}`;

const passportConfig = {
  facebookConfig: {
    clientID: process.env.PASSPORT_FACEBOOK_CLIENT_ID,
    clientSecret: process.env.PASSPORT_FACEBOOK_CLIENT_SECRET,
    callbackURL: `${tmpStr}/auth/facebook/callback`,
  },
  googleConfig: {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: `${tmpStr}/auth/google/callback`,
  },
};

module.exports = passportConfig;
