const parseCookies = (cookie = document.cookie) =>
  cookie
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, [key, value]) => {
      acc[key.trim()] = decodeURIComponent(value);
      return acc;
    }, {});

export default parseCookies;
