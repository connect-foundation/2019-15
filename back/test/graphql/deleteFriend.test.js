const request = require('supertest');

const graphqlPath = require('../../config/graphqlPath');
const { app } = require('../../app');
const signJWT = require('../../util/jwt/signJWT');

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});

describe('deleteFriend resolvers test', () => {
  it(`delete friend by nickname`, async (done) => {
    // add
    request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: `{
                addFriendForTest{
                  id
                }
              }`,
      });

    // delete
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: `mutation deleteFriend {
                  deleteFriend(nickname: "배추김치") {
                    id
                  }
                }`,
      })
      .expect(200);
    const deleteExpected = [];
    expect(res.body.data.deleteFriend).toStrictEqual(expect.arrayContaining(deleteExpected));
    done();
  });
});
