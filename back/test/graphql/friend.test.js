const request = require('supertest');

const graphqlPath = require('../../config/graphqlPath');
const { app } = require('../../app');
const signJWT = require('../../util/jwt/signJWT');

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});
describe('friend resolvers test', () => {
  it(`get friends' nicknames using given user's id by joining friends/users tables`, async (done) => {
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: `mutation {
                  friends(pFriendId:4){
                    nickname
                  }
                }`,
      })
      .expect(200);
    const friendsExpected = [
      {
        nickname: expect.any(String),
      },
    ];
    expect(res.body.data.friends).toStrictEqual(expect.arrayContaining(friendsExpected));
    done();
  });
});
