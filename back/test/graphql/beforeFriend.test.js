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

describe('친구 요청 삭제', () => {
  it('ID가 17인 유저가 요청한 친구 요청 제거', async () => {
    const id = 17;
    const gqQuery = `mutation {
        deleteFriendRequest(id:${id}) {
          id
        }
      }`;
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { id: deletedId } = res.body.data.deleteFriendRequest;
    expect(parseInt(deletedId, 0)).toBe(id);
  });
});

describe('친구 요청 생성', () => {
  it('nickname이 도라지인 유저에게 친구 요청', async () => {
    const nickname = '도라지';
    const gqQuery = `mutation {
        sendFriendRequest(nickname:"${nickname}") {
          nickname
        }
      }`;
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { nickname: friendNickname } = res.body.data.sendFriendRequest;
    expect(friendNickname).toBe(nickname);
  });
});

describe('친구 요청 승낙', () => {
  it('ID가 18인 친구의 친구 요청 승낙', async () => {
    const id = 18;
    const gqQuery = `mutation {
        acceptFriendRequest(id:${id}) {
          id
        }
      }`;
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { id: friendId } = res.body.data.acceptFriendRequest;
    expect(parseInt(friendId, 0)).toBe(id);
  });
});
