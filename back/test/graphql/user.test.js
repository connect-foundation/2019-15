const uuid = require('uuid/v1');
const graphqlPath = require('../../config/graphqlPath');
const signJWT = require('../../util/jwt/signJWT');
const sendGqRequest = require('../../util/test/graphql');

let token;
beforeAll(async () => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
});
describe('graphql user resolvers tests', () => {
  it('users query', async (done) => {
    const query = `{
      users{
        userId nickname score
      }
    }`;
    const res = await sendGqRequest(token, graphqlPath, query);
    const usersExpected = [
      {
        userId: expect.any(String),
        nickname: expect.any(String),
        score: expect.any(Number),
      },
    ];
    expect(res.body.data.users).toStrictEqual(expect.arrayContaining(usersExpected));
    done();
  });
});

describe('유저 닉네임 중복검사 및 변경 테스트', () => {
  it('사용 중인 닉네임 중복검사 테스트', async (done) => {
    const nicknameDuplicated = '강아지';
    const query = `{
          checkNicknameAvailable(nickname:"${nicknameDuplicated}"){
            result
          }
        }`;
    const res = await sendGqRequest(token, graphqlPath, query);
    expect(res.body.data.checkNicknameAvailable.result).toBeFalsy();
    done();
  });

  it('비사용중인 닉네임 중복검사 테스트', async (done) => {
    const nicknameDuplicated = uuid();
    const query = `query {
          checkNicknameAvailable(nickname:"${nicknameDuplicated}"){
            result
          }
        }`;
    const res = await sendGqRequest(token, graphqlPath, query);
    expect(res.body.data.checkNicknameAvailable).toBeTruthy();
    done();
  });

  it('닉네임 변경 테스트', async (done) => {
    const nicknameToChange = uuid();
    const query = `mutation {
          changeNickname(nickname:"${nicknameToChange}"){
            result
          }
        }`;
    const res = await sendGqRequest(token, graphqlPath, query);
    expect(res.body.data.changeNickname.result).toBeTruthy();
    done();
  });
});
