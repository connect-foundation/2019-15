import APP_URI from 'constants/uri';

export const autoLoginCheckboxEventHandler = (e) => {
  localStorage.setItem('autoLogIn', e.target.checked.toString());
};

export const getAutoLogIn = () => {
  return localStorage.getItem('autoLogIn') === 'true';
};

export const checkAuth = (setNickName, setIsLogin) => {
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
        setIsLogin(false);
      }
      if (response.status === 200) {
        setIsLogin(true);
      }
      return response.text();
    })
    .then((response) => {
      if (setNickName) setNickName(response);
    })
    .catch((error) => console.log(error));
};

export const checkAutoLogIn = () => {
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
};
