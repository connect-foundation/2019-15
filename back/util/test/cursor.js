const getGqStrFromAttrs = (attrs) => {
  return attrs.reduce((acc, attr) => {
    if (typeof attr !== 'object') {
      return `${acc} ${attr}`;
    }
    if (!Object.keys(attr).length) return acc;
    const fk = Object.keys(attr)[0];
    const content = getGqStrFromAttrs(attr[fk]);
    return `${acc}\n${fk}{\n${content}\n}`;
  }, '');
};

const getGqCursorQuery = (queryType, resolverName, params = {}, attrs = []) => {
  const query = Object.entries(params).reduce(
    (acc, [key, val]) => {
      if (typeof val === 'string' && val.toLowerCase() === val) return `${acc} ${key}:"${val}"`;
      return `${acc} ${key}:${val}`;
    },
    `${queryType}{
     ${resolverName}(`,
  );
  return `${query}){
        pageInfo{
          endCursor
          hasNextPage
        }
        edges{
          node{
            ${getGqStrFromAttrs(attrs)}
          }
          cursor
        }
      }
  }`;
};

const testCursorQuery = ({ edges, pageInfo }, first, expectedNode, isAsc = true) => {
  if (edges.length) {
    expect(edges[edges.length - 1].cursor).toStrictEqual(pageInfo.endCursor);
  }

  const expectEdgeCursorOrder = (edge1, edge2) => {
    expect(parseInt(isAsc ? edge2.cursor : edge1.cursor, 10)).toBeGreaterThan(
      parseInt(isAsc ? edge1.cursor : edge2.cursor, 10),
    );
  };

  edges.forEach((edge, idx) => {
    expect(edge).toMatchObject(expectedNode);
    if (idx !== 0) expectEdgeCursorOrder(edges[idx - 1], edge);
  });

  expect(edges.length).toBeLessThanOrEqual(first);
  if (edges.length === first) {
    expect(pageInfo.hasNextPage).toStrictEqual(true);
  } else {
    expect(pageInfo.hasNextPage).toStrictEqual(false);
  }
};

module.exports = {
  getGqCursorQuery,
  testCursorQuery,
};
