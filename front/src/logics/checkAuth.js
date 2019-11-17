function checkAuth() {
  fetch(`${process.env.REACT_APP_LOCAL_API_URI}/auth/authenticate`, {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => {
      if (response.status === 401 || response.status === 403) {
        window.location.href = `${process.env.REACT_APP_LOCAL_URI}`;
      }
    })
    .catch((error) => console.log(error));
}

export default checkAuth;
