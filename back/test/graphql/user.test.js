const request = require('supertest');
const uuid = require('uuid/v1');

const graphqlPath = require('../../config/graphqlPath');
const { app } = require('../../app');
const signJWT = require('../../util/jwt/signJWT');

let token;
beforeAll(async () => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
});
describe('graphql user resolvers tests', () => {
  it('users query', async (done) => {
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: `{
          users{
            userId nickname score
          }
        }`,
      })
      .expect(200);
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
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: `{
          checkNicknameAvailable(nickname:"${nicknameDuplicated}")
        }`,
      })
      .expect(200);
    expect(res.body.data.checkNicknameAvailable).toBeFalsy();
    done();
  });

  it('비사용중인 닉네임 중복검사 테스트', async (done) => {
    const nicknameDuplicated = '고릴라';
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: `query {
          checkNicknameAvailable(nickname:"${nicknameDuplicated}")
        }`,
      })
      .expect(200);
    expect(res.body.data.checkNicknameAvailable).toBeTruthy();
    done();
  });

  it('닉네임 변경 테스트', async (done) => {
    const nicknameToChange = uuid();
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: `mutation {
          changeNickname(nickname:"${nicknameToChange}")
        }`,
      })
      .expect(200);
    expect(res.body.data.changeNickname).toBe(nicknameToChange);
    done();
  });
});
