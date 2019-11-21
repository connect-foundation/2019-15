const { Users } = require('../db/models');
const signUp = require('../util/signUp');

async function logInOrSignUp(accessToken, refreshToken, profile, done) {
  // 회원가입인지 로그인인지 판단한다
  let user = await Users.findOne({
    where: {
      userId: profile.id,
    },
  });
  // 회원가입인 경우
  if (!user) {
      user = signUp(user, profile);
  }

  return done(null, {
    id: profile.id,
    displayName: profile.displayName,
    nickname: user.nickname,
  });
}

module.exports = logInOrSignUp;
