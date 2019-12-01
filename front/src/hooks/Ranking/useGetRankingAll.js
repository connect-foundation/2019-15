import { useQuery } from '@apollo/react-hooks';
import { getRankingAll } from 'queries/ranking';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import React from 'react';

const useGetRankingAll = () => {
  const { data, loading, error, fetchMore } = useQuery(getRankingAll);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Alert type="error" />;
  }

  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = data.rankingAll;
  if (!edges.length) {
    return <Alert type="noData" />;
  }

  const loadMore = () => {
    fetchMore({
      query: getRankingAll,
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.rankingAll.edges;
        const { pageInfo } = fetchMoreResult.rankingAll;
        return newEdges.length
          ? {
              rankingAll: {
                __typename: prev.rankingAll.__typename,
                edges: [...prev.rankingAll.edges, ...newEdges],
                pageInfo,
              },
            }
          : prev;
      },
    });
  };
};

export default useGetRankingAll;
