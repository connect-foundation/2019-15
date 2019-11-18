import APP_URI from '../util/uri';

function checkAutoLogIn() {
    fetch(`${APP_URI.REACT_APP_API_URI}/auth/authenticate`, {
        method: 'GET',
        credentials: 'include',
    })
        .then((response) => {
            if (response.status === 200) window.location.href = `${APP_URI.REACT_APP_URI}/main`;
        })
        .catch((error) => console.log(error));
}

export default checkAutoLogIn;
