const { req, graphqlPath } = require('./setSuperTest');

describe('graphql user resolvers tests', () => {
  it('users query', async (done) => {
    const res = await req
      .post(graphqlPath)
      .send({
        query: `{
           users{
             userId, nickname, score
           }
          }`,
      })
      .expect(200);
    const usersExpected = [
      { userId: '1111', nickname: '이지영', score: 4444 },
      { userId: '2222', nickname: '이창권', score: 3333 },
      { userId: '3333', nickname: '손진아', score: 2222 },
      { userId: '4444', nickname: '최형준', score: 1111 },
    ];
    expect(res.body.data.users).toStrictEqual(
      expect.arrayContaining(usersExpected),
    );
    done();
  });
});
