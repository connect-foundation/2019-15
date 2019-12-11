const getPageResult = (edgesWithCursor, first) => {
  return {
    edges: edgesWithCursor,
    pageInfo: {
      endCursor: edgesWithCursor.length ? edgesWithCursor[edgesWithCursor.length - 1].cursor : null,
      hasNextPage: edgesWithCursor.length === first,
    },
  };
};

const intTo10Str = (int) => {
  return int.toString().padStart(10, '0');
};

const getEdgesFromNodes = (nodes, getCursorFromNode) => {
  return nodes.map(({ dataValues: node }) => {
    return {
      node,
      cursor: getCursorFromNode(node),
    };
  });
};

module.exports = {
  getPageResult,
  intTo10Str,
  getEdgesFromNodes,
};
