const { req, graphqlPath } = require('./setSuperTest');

describe('graphql user resolvers tests', () => {
  it('users query', async (done) => {
    const res = await req
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
    expect(res.body.data.users).toStrictEqual(
      expect.arrayContaining(usersExpected),
    );
    done();
  });
});
