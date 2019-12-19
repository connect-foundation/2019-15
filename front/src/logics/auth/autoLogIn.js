const autoLoginCheckboxEventHandler = (e) => {
  localStorage.setItem('autoLogIn', e.target.checked.toString());
};

const setAutoLogIn = (isAutoLogIn) => {
  localStorage.setItem('autoLogIn', isAutoLogIn.toString());
};

const getAutoLogIn = () => {
  return localStorage.getItem('autoLogIn') === 'true';
};

export { autoLoginCheckboxEventHandler, setAutoLogIn, getAutoLogIn };
