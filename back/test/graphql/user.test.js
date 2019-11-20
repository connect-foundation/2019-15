const request = require('supertest');

const graphqlPath = require('../../config/graphqlPath');
const { app } = require('../../app');
const signJWT = require('../../util/signJWT');

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
