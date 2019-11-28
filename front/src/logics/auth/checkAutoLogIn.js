import APP_URI from '../../util/uri';

function checkAutoLogIn() {
  fetch(`${APP_URI.REACT_APP_API_URI}/auth/authenticate`, {
    method: 'GET',
    credentials: 'include',
    weakCredentials: true,
    httpOnly: false,
    secure: false,
  })
    .then((response) => {
      if (response.status === 200) window.location.href = `#/main`;
    })
    .catch((error) => console.log(error));
}

export default checkAutoLogIn;
