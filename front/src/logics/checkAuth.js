function checkAuth() {
  fetch('http://localhost:3001/auth/authenticate', {
    // fetch(`${process.env.EXPRESS_APP_URI}/auth/authenticate`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => {
      if (response.status === 401 || response.status === 403)
        window.location.href = 'http://localhost:3000/';
    })
    .catch(error => console.log(error));
}

export default checkAuth;
