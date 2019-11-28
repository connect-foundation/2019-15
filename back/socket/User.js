const User = (nickname, socket) => {
  return { nickname, privileged : false, socket };
};

module.exports = User;
