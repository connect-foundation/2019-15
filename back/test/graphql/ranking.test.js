const { req, graphqlPath } = require('./setSuperTest');

const getQuery = ({ order, first, after }) => {
  let query = `{
     ranking(`;
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
    expect(edges[idx].node.score).toBeLessThanOrEqual(
      edges[idx + 1].node.score,
    );
  if (order !== 'ASC') {
    scoreExpectFunc = (idx) => {
      expect(edges[idx].node.score).toBeGreaterThanOrEqual(
        edges[idx + 1].node.score,
      );
    };
  }
  edges.forEach((_, idx) => {
    if (idx >= edges.length - 1) return;
    scoreExpectFunc(idx);
  });
  expect(edges[edges.length - 1].cursor).toEqual(pageInfo.endCursor);
};

describe('ranking resolvers test', () => {
  it(`순서: ASC, 개수:2개 커서:X`, async (done) => {
    const expectedLength = 3;
    const order = 'ASC';
    const res = await req
      .post(graphqlPath)
      .send({
        query: getQuery({ order, first: expectedLength }),
      })
      .expect(200);
    const { pageInfo, edges } = res.body.data.ranking;
    testEdges(
      { edges, pageInfo, expectedLength },
      { order, isEdgeLengthSame: true },
    );
    done();
  });

  it('순서: DESC, 개수: 3개, 커서:X', async (done) => {
    const order = 'DESC';
    const expectedLength = 3;
    const res = await req
      .post(graphqlPath)
      .send({
        query: getQuery({ first: expectedLength }),
      })
      .expect(200);
    const { pageInfo, edges } = res.body.data.ranking;
    testEdges(
      { edges, pageInfo, expectedLength },
      { order, isEdgeLengthSame: true },
    );
    done();
  });

  it(`DB에 유저 3~5명 있을 시(마지막 페이지 일 때), 순서: DESC, 개수: 3개, 커서: `, async (done) => {
    const order = 'DESC';
    const expectedLength = 3;
    const res = await req
      .post(graphqlPath)
      .send({
        query: getQuery({
          first: expectedLength,
          after: '00000000030000002222',
        }),
      })
      .expect(200);
    const { pageInfo, edges } = res.body.data.ranking;
    testEdges(
      { edges, pageInfo, expectedLength },
      { order, isEdgeLengthSame: false },
    );
    done();
  });
});
