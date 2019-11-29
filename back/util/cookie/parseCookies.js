const parseCookies = (cookie) =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = decodeURIComponent(value);
      return acc;
    }, {});

module.exports = parseCookies;
