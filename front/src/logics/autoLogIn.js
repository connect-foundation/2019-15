function autoLoginCheckboxEventHandler(e) {
  localStorage.setItem('autoLogIn', e.target.checked.toString());
}

function setAutoLogIn(isAutoLogIn) {
  localStorage.setItem('autoLogIn', isAutoLogIn.toString());
}

function getAutoLogIn() {
  return localStorage.getItem('autoLogIn') === 'true';
}

export { autoLoginCheckboxEventHandler, setAutoLogIn, getAutoLogIn };
