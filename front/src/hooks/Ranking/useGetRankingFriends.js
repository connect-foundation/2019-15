import { useQuery } from '@apollo/react-hooks';
import { getRankingFriends } from 'queries/ranking';

const useGetRankingFriends = () => {
  const { data, loading, error, fetchMore } = useQuery(getRankingFriends);

  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = data
    ? data.rankingFriends
    : { pageInfo: { endCursor: null, hasNextPage: null }, edges: null };

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchMore({
      query: getRankingFriends,
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.rankingFriends.edges;
        const { pageInfo } = fetchMoreResult.rankingFriends;
        return newEdges.length
          ? {
              getRankingFriends: {
                __typename: prev.rankingFriends.__typename,
                edges: [...prev.rankingFriends.edges, ...newEdges],
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

export default useGetRankingFriends;
