const getDomain = (uri) => {
  return uri.split('://')[1].split(':')[0];
};

module.exports = getDomain;
