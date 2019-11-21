const User = (nickname) => {
  if (nickname) return { nickname };

  return { nickname: null };
};

export default User;
