let REACT_APP_API_URI = process.env.REACT_APP_LOCAL_API_URI;
let REACT_APP_URI = process.env.REACT_APP_LOCAL_URI;
if (process.env.REACT_APP_ENV === 'development') {
  REACT_APP_API_URI = process.env.REACT_APP_DEV_API_URI;
  REACT_APP_URI = process.env.REACT_APP_DEV_URI;
} else if (process.env.REACT_APP_ENV === 'production') {
  REACT_APP_API_URI = process.env.REACT_APP_PROD_API_URI;
  REACT_APP_URI = process.env.REACT_APP_PROD_URI;
}

const APP_URI = {
  REACT_APP_URI,
  REACT_APP_API_URI,
};

console.log(`REACT_URI:${REACT_APP_URI}, EXPRESS_URI:${REACT_APP_API_URI}`);
export default APP_URI;
