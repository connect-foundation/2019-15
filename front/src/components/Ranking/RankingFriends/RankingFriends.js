import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getRankingFriends } from '../../../queries/ranking';
import Loading from '../../globalComponents/Loading/Loading';
import Alert from '../../globalComponents/Alert/Alert';
import UserRankingList from '../UserRankingList/UserRankingList';
import InfinityScroll from '../../globalComponents/InfinityScroll/InfinityScroll';
import RankingFriendsStyle from './RankingFriends.style';

const RankingFriends = () => {
  const { data, loading, error, fetchMore } = useQuery(getRankingFriends);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Alert type="error" />;
  }

  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = data.rankingFriends;
  if (!edges.length) {
    return <Alert type="noData" />;
  }

  const loadMore = () =>
    fetchMore({
      query: getRankingFriends,
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.rankingFriends.edges;
        const { pageInfo } = fetchMoreResult.rankingFriends;
        return newEdges.length
          ? {
              rankingFriends: {
                __typename: prev.rankingFriends.__typename,
                edges: [...prev.rankingFriends.edges, ...newEdges],
                pageInfo,
              },
            }
          : prev;
      },
    });
  const users = edges.map((edge) => edge.node);
  return (
    <RankingFriendsStyle>
      <InfinityScroll loadMore={loadMore} hasMore={hasNextPage}>
        <UserRankingList users={users} />
      </InfinityScroll>
    </RankingFriendsStyle>
  );
};

export default RankingFriends;
