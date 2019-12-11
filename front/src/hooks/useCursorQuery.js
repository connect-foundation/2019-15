import { useQuery } from '@apollo/react-hooks';

const useCursorQuery = (query) => {
  const { data, loading, error, fetchMore,refetch } = useQuery(query);

  const key = data && Object.keys(data).length ? Object.keys(data)[0] : null;
  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = key
    ? data[key]
    : { pageInfo: { endCursor: null, hasNextPage: null }, edges: null };

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchMore({
      query,
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult[key].edges;
        const { pageInfo } = fetchMoreResult[key];
        return newEdges.length
          ? {
              [key]: {
                __typename: prev[key].__typename,
                edges: [...prev[key].edges, ...newEdges],
                pageInfo,
              },
            }
          : prev;
      },
    });
  };
  const users = edges ? edges.map((edge) => edge.node) : null;
  return {
    data: users,
    loading,
    error,
    fetchMore: loadMore,
    hasMore: hasNextPage,
    refetch
  };
};

export default useCursorQuery;
