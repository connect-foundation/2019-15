import React from 'react';
import useGetRankingAll from 'hooks/Ranking/useGetRankingAll';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import UserRankingList from '../UserRankingList/UserRankingList';
import RankingAllStyle from './RankingAll.style';
import UserRankingListStyle from '../UserRankingList/UserRankingList.style';

export default function RankingAll() {
  const { data, loading, error, fetchMore, hasMore } = useGetRankingAll();
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
