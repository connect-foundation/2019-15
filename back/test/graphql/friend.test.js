const { getGqCursorQuery, testCursorQuery } = require('../../util/test/cursor');
const sendGqRequest = require('../../util/test/graphql');
const graphqlPath = require('../../config/graphqlPath');
const signJWT = require('../../util/jwt/signJWT');

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});

describe('친구 목록 조회', () => {
  const attrs = ['id', { sFriend: ['id', 'nickname'] }];
  const friendNode = {
    node: {
      id: expect.any(String),
      sFriend: {
        id: expect.any(Number),
        nickname: expect.any(String),
      },
    },
    cursor: expect.any(String),
  };

  it(`친구 목록 개수:8개 커서:x`, async (done) => {
    const first = 8;
    const gqQuery = getGqCursorQuery('query', 'friends', { first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { friends } = res.body.data;
    testCursorQuery(friends, first, friendNode);
    done();
  });
  it(`친구 목록 개수:10개 커서:2`, async (done) => {
    const first = 8;
    const after = '2';
    const gqQuery = getGqCursorQuery('query', 'friends', { first, after }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { friends } = res.body.data;
    testCursorQuery(friends, first, friendNode);
    done();
  });
});

describe('친구 삭제', () => {
  const id = 1;
  const nickname = '강아지';
  it('ID가 1인 친구 삭제', async (done) => {
    const gqQuery = `mutation {
        deleteFriend(id:${id}) {
          id nickname
        }
      }`;
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { deleteFriend } = res.body.data;
    expect(deleteFriend).toStrictEqual({ id });
    done();
  });
  afterEach(async () => {
    const sendFriendRequestQuery = `mutation{
        sendFriendRequest(nickname: "${nickname}") {
          id
        }
      }`;
    await sendGqRequest(token, graphqlPath, sendFriendRequestQuery);
    const acceptFriendRequestQuery = `mutation{
      acceptFriendRequest(id:${id},nickname:${nickname}{
        id
      }
    `;
    await sendGqRequest(token, graphqlPath, acceptFriendRequestQuery);
  });
});
