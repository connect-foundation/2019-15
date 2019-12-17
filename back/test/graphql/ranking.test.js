const graphqlPath = require('../../config/graphqlPath');
const signJWT = require('../../util/jwt/signJWT');
const sendGqRequest = require('../../util/test/graphql');
const { getGqCursorQuery, testCursorQuery } = require('../../util/test/cursor');

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});

const attrs = ['id', 'score', 'nickname'];
const rankingNode = {
  node: {
    id: expect.any(Number),
    nickname: expect.any(String),
    score: expect.any(Number),
  },
  cursor: expect.any(String),
};
describe('랭킹 graphql 쿼리 테스트', () => {
  test(`순서: ASC, 개수:12개 커서:X`, async (done) => {
    const first = 12;
    const order = 'ASC';
    const gqQuery = getGqCursorQuery('query', 'rankingAll', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { rankingAll } = res.body.data;
    testCursorQuery(rankingAll, first, rankingNode);
    done();
  });

  test('순서: DESC, 개수: 10개, 커서:X', async (done) => {
    const order = 'DESC';
    const first = 10;
    const gqQuery = getGqCursorQuery('query', 'rankingAll', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { rankingAll } = res.body.data;
    testCursorQuery(rankingAll, first, rankingNode, false);
    done();
  });

  test(`순서: DESC, 개수: 10개, 커서: 00000011110000001111`, async (done) => {
    const order = 'DESC';
    const first = 10;
    const after = '00000011110000001111';
    const gqQuery = getGqCursorQuery('query', 'rankingAll', { order, first, after }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { rankingAll } = res.body.data;
    testCursorQuery(rankingAll, first, rankingNode, false);
    done();
  });
});

describe('친구 랭킹 graphql 쿼리 테스트', () => {
  it(`순서: ASC, 개수:8개, 커서:X`, async (done) => {
    const first = 8;
    const order = 'ASC';
    const gqQuery = getGqCursorQuery('query', 'rankingFriends', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { rankingFriends } = res.body.data;
    testCursorQuery(rankingFriends, first, rankingNode);
    done();
  });

  it(`순서: DESC, 개수:10개, 커서:X`, async (done) => {
    const first = 10;
    const order = 'DESC';
    const gqQuery = getGqCursorQuery('query', 'rankingFriends', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { rankingFriends } = res.body.data;
    testCursorQuery(rankingFriends, first, rankingNode, false);
    done();
  });

  it(`순서: DESC, 개수:10개, 커서:00000011110000001111`, async (done) => {
    const first = 10;
    const order = 'DESC';
    const after = '00000011110000001111';
    const gqQuery = getGqCursorQuery('query', 'rankingFriends', { order, first, after }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { rankingFriends } = res.body.data;
    testCursorQuery(rankingFriends, first, rankingNode, false);
    done();
  });
});
