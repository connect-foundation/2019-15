import APP_URI from '../../util/uri';

function checkAuth() {
  fetch(`${APP_URI.REACT_APP_API_URI}/auth/authenticate`, {
    method: 'GET',
    credentials: 'include',
    weakCredentials: true,
    httpOnly: false,
    secure: false,
  })
    .then((response) => {
      if (response.status === 401 || response.status === 403) {
        window.location.href = `#/`;
      }
    })
    .catch((error) => console.log(error));
}

export default checkAuth;
