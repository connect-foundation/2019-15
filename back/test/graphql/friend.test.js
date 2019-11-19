/*
const { req, graphqlPath } = require('./setSuperTest');

describe('friend resolvers test', () => {
  it(`get friends' nicknames using given user's id by joining friends/users tables`, async (done) => {
    const res = await req
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
    expect(res.body.data.friends).toStrictEqual(
      expect.arrayContaining(friendsExpected),
    );
    done();
  });
});
*/
