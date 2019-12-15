const { getGqCursorQuery, testCursorQuery } = require('../../util/test/cursor');
const sendGqRequest = require('../../util/test/graphql');
const graphqlPath = require('../../config/graphqlPath');
const signJWT = require('../../util/jwt/signJWT');

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});

describe('친구 신청 목록 조회', () => {
  const attrs = ['id', { pFriend: ['id', 'nickname'] }];
  const beforeFriendNode = {
    node: {
      id: expect.any(String),
      pFriend: {
        id: expect.any(Number),
        nickname: expect.any(String),
      },
    },
    cursor: expect.any(String),
  };
  it(`친구 신청 목록 개수:8개 커서:x`, async (done) => {
    const first = 8;
    const gqQuery = getGqCursorQuery('query', 'beforeFriends', { first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { beforeFriends } = res.body.data;

    testCursorQuery(beforeFriends, first, beforeFriendNode);
    done();
  });
  it(`친구 목록 개수:10개 커서:2`, async (done) => {
    const first = 8;
    const after = '2';
    const gqQuery = getGqCursorQuery('query', 'beforeFriends', { first, after }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { beforeFriends } = res.body.data;

    testCursorQuery(beforeFriends, first, beforeFriendNode);
    done();
  });
});


