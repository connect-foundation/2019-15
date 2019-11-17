const { req, graphqlPath } = require('./setSuperTest');

// 삭제한 후에 해당 컬럼의 존재 여부 확인.
// add -> delete -> add했던 컬럼 있나 확인

describe('deleteFriend resolvers test', () => {
  it(`delete friend by nickname`, async (done) => {
    // add
    req.post(graphqlPath).send({
      query: `{
                addFriendForTest{
                  id
                }
              }`,
    });

    // delete
    const res = await req
      .post(graphqlPath)
      .send({
        query: `{
                  deleteFriend(id:2,nickname:"이지영"){
                    id
                  }
                }`,
      })
      .expect(200);
    const deleteExpected = [];
    expect(res.body.data.deleteFriend).toStrictEqual(
      expect.arrayContaining(deleteExpected),
    );
    done();
  });
});
