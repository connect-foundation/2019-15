import React from 'react';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import useCursorQuery from 'hooks/useCursorQuery';
import { GET_RANKING_ALL } from 'queries/ranking';
import UserRankingList from '../UserRankingList/UserRankingList';
import RankingAllStyle from './RankingAll.style';
import UserRankingListStyle from '../UserRankingList/UserRankingList.style';

export default function RankingAll() {
  const { data, loading, error, fetchMore, hasMore } = useCursorQuery(
    GET_RANKING_ALL,
  );
  if (loading) {
    return (
      <UserRankingListStyle>
        <Loading />
      </UserRankingListStyle>
    );
  }
  if (error) {
    return (
      <UserRankingListStyle>
        <Alert type="error" />
      </UserRankingListStyle>
    );
  }

  if (!data.length) {
    return (
      <UserRankingListStyle>
        <Alert type="noData" />
      </UserRankingListStyle>
    );
  }

  return (
    <RankingAllStyle>
      <InfinityScroll loadMore={fetchMore} hasMore={hasMore}>
        <UserRankingList users={data} />
      </InfinityScroll>
    </RankingAllStyle>
  );
}
