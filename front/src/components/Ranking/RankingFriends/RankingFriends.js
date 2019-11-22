import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {getRankingFriends} from '../../../queries/ranking';
import Loading from '../../globalComponents/Loading/Loading';
import Alert from '../../globalComponents/Alert/Alert';
import UserRankingList from '../UserRankingList/UserRankingList';
import Button from '../../globalComponents/Button/Button';
import RankingAllStyle from '../RankingAll/RankingAll.style';

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
    <RankingAllStyle>
      <UserRankingList users={users} />
      {hasNextPage ? <Button onClick={loadMore}>more</Button> : null}
    </RankingAllStyle>
  );
};

export default RankingFriends;
