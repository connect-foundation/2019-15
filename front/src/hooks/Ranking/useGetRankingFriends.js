import { useQuery } from '@apollo/react-hooks';
import { getRankingFriends } from 'queries/ranking';

const useGetRankingAll = () => {
  const { data, loading, error, fetchMore } = useQuery(getRankingFriends);

  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = data
    ? data.rankingAll
    : { pageInfo: { endCursor: null, hasNextPage: null }, edges: null };

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchMore({
      query: getRankingFriends,
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.rankingAll.edges;
        const { pageInfo } = fetchMoreResult.rankingAll;
        return newEdges.length
          ? {
              getRankingFriends: {
                __typename: prev.rankingAll.__typename,
                edges: [...prev.rankingAll.edges, ...newEdges],
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
  };
};

export default useGetRankingAll;
