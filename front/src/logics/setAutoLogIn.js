function setAutoLogIn(e) {
    localStorage.setItem('autoLogIn', e.target.checked.toString());
}

export default setAutoLogIn;
