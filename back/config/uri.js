let EXPRESS_URI = process.env.EXPRESS_LOCAL_URI;
let REACT_URI = process.env.REACT_LOCAL_URI;
if (process.env.NODE_ENV === 'development') {
  EXPRESS_URI = process.env.EXPRESS_DEV_URI;
  REACT_URI = process.env.REACT_DEV_URI;
} else if (process.env.NODE_ENV === 'production') {
  EXPRESS_URI = process.env.EXPRESS_PROD_URI;
  REACT_URI = process.env.REACT_PROD_URI;
}

module.exports = {
  EXPRESS_URI,
  REACT_URI,
};
