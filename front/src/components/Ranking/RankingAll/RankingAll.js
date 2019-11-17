import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import GET_RANKING_ALL from '../../../queries/ranking';
import Loading from '../../globalComponents/Loading/Loading';
import Alert from '../../globalComponents/Alert/Alert';
import UserRankingList from './UserRankingList/UserRankingList';
import Button from '../../globalComponents/Button/Button';
import RankingAllStyle from './RankingAll.style';

const RankingAll = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_RANKING_ALL);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Alert type="error" />;
  }

  const {
    pageInfo: { endCursor, hasNextPage },
    edges,
  } = data.ranking;
  if (!edges.length) {
    return <Alert type="noData" />;
  }

  const loadMore = () =>
    fetchMore({
      query: GET_RANKING_ALL,
      variables: { after: endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.ranking.edges;
        const { pageInfo } = fetchMoreResult.ranking;
        return newEdges.length
          ? {
              ranking: {
                __typename: prev.ranking.__typename,
                edges: [...prev.ranking.edges, ...newEdges],
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

export default RankingAll;
