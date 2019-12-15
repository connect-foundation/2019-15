const graphqlPath = require('../../config/graphqlPath');
const signJWT = require('../../util/jwt/signJWT');
const { sendGqRequest, getGqCursorQuery } = require('../../util/test/graphql');

const testEdges = (values, testOptions) => {
  const { edges, pageInfo, first } = values;
  const { order } = testOptions;

  expect(edges.length).toBeLessThanOrEqual(first);

  let scoreExpectFunc = (idx) =>
    expect(edges[idx].node.score).toBeLessThanOrEqual(edges[idx + 1].node.score);
  if (order !== 'ASC') {
    scoreExpectFunc = (idx) => {
      expect(edges[idx].node.score).toBeGreaterThanOrEqual(edges[idx + 1].node.score);
    };
  }

  edges.forEach((_, idx) => {
    if (idx >= edges.length - 1) return;
    scoreExpectFunc(idx);
  });

  if (edges.length) expect(edges[edges.length - 1].cursor).toEqual(pageInfo.endCursor);
};

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});

const attrs = ['id', 'score', 'nickname'];
describe('랭킹 graphql 쿼리 테스트', () => {
  test(`순서: ASC, 개수:12개 커서:X`, async (done) => {
    const first = 12;
    const order = 'ASC';
    const gqQuery = getGqCursorQuery('query', 'rankingAll', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { pageInfo, edges } = res.body.data.rankingAll;
    testEdges({ edges, pageInfo, first }, { order });
    done();
  });

  test('순서: DESC, 개수: 10개, 커서:X', async (done) => {
    const order = 'DESC';
    const first = 10;
    const gqQuery = getGqCursorQuery('query', 'rankingAll', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { pageInfo, edges } = res.body.data.rankingAll;
    testEdges({ edges, pageInfo, first }, { order });
    done();
  });

  test(`순서: DESC, 개수: 10개, 커서: 00000011110000001111`, async (done) => {
    const order = 'DESC';
    const first = 10;
    const after = '00000011110000001111';
    const gqQuery = getGqCursorQuery('query', 'rankingAll', { order, first, after }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { pageInfo, edges } = res.body.data.rankingAll;
    testEdges({ edges, pageInfo, first }, { order });
    done();
  });
});

describe('친구 랭킹 graphql 쿼리 테스트', () => {
  it(`순서: ASC, 개수:8개, 커서:X`, async (done) => {
    const first = 8;
    const order = 'ASC';
    const gqQuery = getGqCursorQuery('query', 'rankingFriends', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { pageInfo, edges } = res.body.data.rankingFriends;
    testEdges({ edges, pageInfo, first }, { order });
    done();
  });

  it(`순서: DESC, 개수:10개, 커서:X`, async (done) => {
    const first = 10;
    const order = 'DESC';
    const gqQuery = getGqCursorQuery('query', 'rankingFriends', { order, first }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { pageInfo, edges } = res.body.data.rankingFriends;
    testEdges({ edges, pageInfo, first }, { order });
    done();
  });

  it(`순서: DESC, 개수:10개, 커서:00000011110000001111`, async (done) => {
    const first = 10;
    const order = 'DESC';
    const after = '00000011110000001111';
    const gqQuery = getGqCursorQuery('query', 'rankingFriends', { order, first, after }, attrs);
    const res = await sendGqRequest(token, graphqlPath, gqQuery);
    const { pageInfo, edges } = res.body.data.rankingFriends;
    testEdges({ edges, pageInfo, first }, { order });
    done();
  });
});
