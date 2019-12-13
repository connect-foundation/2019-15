export const getLoadingWithNetwork = (networkStatus, loading) =>
  networkStatus !== 3 && loading;

export const getFirstKey = (obj) => {
  return obj && Object.keys(obj).length ? Object.keys(obj)[0] : null;
};

export const getLoadMore = (
  query,
  loading,
  fetchMore,
  endCursor,
  hasNextPage,
) => {
  return () => {
    if (loading || !hasNextPage) return;
    fetchMore({
      query,
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        const firstKey = getFirstKey(fetchMoreResult);
        const newEdges = fetchMoreResult[firstKey].edges;
        const { pageInfo } = fetchMoreResult[firstKey];
        return newEdges.length
          ? {
              [firstKey]: {
                __typename: prev[firstKey].__typename,
                edges: [...prev[firstKey].edges, ...newEdges],
                pageInfo,
              },
            }
          : prev;
      },
    });
  };
};

export const getNullPage = () => {
  return { pageInfo: { endCursor: null, hasNextPage: null }, edges: null };
};

export const getNodes = (edges) =>
  edges ? edges.map((edge) => edge.node) : null;
