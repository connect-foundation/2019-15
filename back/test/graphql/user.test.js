const request = require('supertest');
const app = require('../../app');

const req = request(app);
const graphqlPath = '/api';

describe('graphql user resolvers tests', () => {
  it('users query', async done => {
    const res = await req
      .post(graphqlPath)
      .send({
        query: `{
           users{
             user_id, nickname
           }
          }`,
      })
      .expect(200);

    const usersExpected = [
      { user_id: '1111', nickname: '이지영' },
      { user_id: '2222', nickname: '이창권' },
      { user_id: '3333', nickname: '손진아' },
      { user_id: '4444', nickname: '최형준' },
    ];
    expect(res.body.data.users).toStrictEqual(
      expect.arrayContaining(usersExpected),
    );
    done();
  });
});
