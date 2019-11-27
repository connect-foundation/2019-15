import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getRankingAll } from '../../../queries/ranking';
import Loading from '../../globalComponents/Loading/Loading';
import Alert from '../../globalComponents/Alert/Alert';
import UserRankingList from '../UserRankingList/UserRankingList';
import RankingAllStyle from './RankingAll.style';
import InfinityScroll from '../../globalComponents/InfinityScroll/InfinityScroll';

const RankingAll = () => {
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
  const users = edges.map((edge) => edge.node);
  return (
    <RankingAllStyle>
      <InfinityScroll loadMore={loadMore} hasMore={hasNextPage}>
        <UserRankingList users={users} />
      </InfinityScroll>
    </RankingAllStyle>
  );
};

export default RankingAll;
