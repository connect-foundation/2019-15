// 유저 객체를 생성하는 코드인데 클래스를 만드는게 더 보는입장에서 좋을까요?
const User = (nickname, socket) => {
  return { nickname, socket };
};

module.exports = User;
