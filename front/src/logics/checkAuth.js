import APP_URI from '../util/uri';

function checkAuth() {
  console.log('test');
  fetch(`${APP_URI.REACT_APP_API_URI}/auth/authenticate`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 401 || response.status === 403) {
        // window.location.href = `${APP_URI.REACT_APP_URI}`;
        console.log('test1');
      }
    })
    .catch((error) => console.log(error));
}

export default checkAuth;
