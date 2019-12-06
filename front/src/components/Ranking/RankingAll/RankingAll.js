import React from 'react';
import useGetRankingAll from 'hooks/Ranking/useGetRankingAll';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import UserRankingList from '../UserRankingList/UserRankingList';
import RankingAllStyle from './RankingAll.style';

export default function RankingAll() {
  const { data, loading, error, fetchMore, hasMore } = useGetRankingAll();
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Alert type="error" />;
  }

  if (!data.length) {
    return <Alert type="noData" />;
  }
  return (
    <RankingAllStyle>
      <InfinityScroll loadMore={fetchMore} hasMore={hasMore}>
        <UserRankingList users={data} />
      </InfinityScroll>
    </RankingAllStyle>
  );
}
