const request = require('supertest');

const graphqlPath = require('../../config/graphqlPath');
const { app } = require('../../app');
const signJWT = require('../../util/signJWT');

const getRankingQuery = (resolverName, { order, first, after }) => {
  let query = `{
     ${resolverName}(`;
  query = order ? `${query} order:${order}` : query;
  query = first ? `${query} first:${first}` : query;
  query = after ? `${query} after:"${after}"` : query;
  return `${query}){
        pageInfo{
          endCursor
          hasNextPage
        }
        totalCount
        edges{
          node{
            id
            score
            nickname
          }
          cursor
        }
      }
   }`;
};

const testEdges = (values, testOptions) => {
  const { edges, pageInfo, expectedLength } = values;
  const { order, isEdgeLengthSame } = testOptions;

  if (isEdgeLengthSame) {
    expect(edges.length).toEqual(expectedLength);
  } else {
    expect(edges.length).toBeLessThan(expectedLength);
  }

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
  expect(edges[edges.length - 1].cursor).toEqual(pageInfo.endCursor);
};

let token;
beforeAll(async (done) => {
  token = await signJWT({ user: { id: 1111, displayName: '최형준' } });
  done();
});

describe('랭킹 graphql 쿼리 테스트', () => {
  test(`순서: ASC, 개수:12개 커서:X`, async (done) => {
    const expectedLength = 12;
    const order = 'ASC';
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: getRankingQuery('rankingAll', { order, first: expectedLength }),
      })
      .expect(200);
    const { pageInfo, edges } = res.body.data.rankingAll;
    testEdges({ edges, pageInfo, expectedLength }, { order, isEdgeLengthSame: true });
    done();
  });

  test('순서: DESC, 개수: 10개, 커서:X', async (done) => {
    const order = 'DESC';
    const expectedLength = 10;
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: getRankingQuery('rankingAll', { first: expectedLength }),
      })
      .expect(200);
    const { pageInfo, edges } = res.body.data.rankingAll;
    testEdges({ edges, pageInfo, expectedLength }, { order, isEdgeLengthSame: true });
    done();
  });

  test(`순서: DESC, 개수: 10개, 커서: 00000011110000001111`, async (done) => {
    const order = 'DESC';
    const expectedLength = 10;
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: getRankingQuery('rankingAll', {
          first: expectedLength,
          after: '00000011110000001111',
        }),
      })
      .expect(200);
    const { pageInfo, edges } = res.body.data.rankingAll;
    testEdges({ edges, pageInfo, expectedLength }, { order, isEdgeLengthSame: false });
    done();
  });
});

describe('친구 랭킹 graphql 쿼리 테스트', () => {
  it(`순서: ASC, 개수:8개 커서:X`, async (done) => {
    const expectedLength = 8;
    const order = 'ASC';
    const res = await request
      .agent(app)
      .set('Cookie', [`jwt=${token}`])
      .post(graphqlPath)
      .send({
        query: getRankingQuery('rankingFriends', { order, first: expectedLength }),
      })
      .expect(200);

    const { pageInfo, edges } = res.body.data.rankingFriends;
    testEdges({ edges, pageInfo, expectedLength }, { order, isEdgeLengthSame: true });
    done();
  });
});
