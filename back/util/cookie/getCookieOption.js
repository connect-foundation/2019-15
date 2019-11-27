const expiresIn = require('./getMsOfDay');
const getDomain = require('./getDomain');
const { REACT_URI } = require('../../config/uri');

function getCookieOption(options = {}) {
  return {
    expires: new Date(options.expires ? options.expires : Date.now() + expiresIn),
    domain: getDomain(REACT_URI),
    overwrite: true,
  };
}

module.exports = getCookieOption;
