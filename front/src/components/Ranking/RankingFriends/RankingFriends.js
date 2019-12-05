import React from 'react';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import useGetRankingFriends from 'hooks/Ranking/useGetRankingFriends';
import RankingAllStyle from 'components/Ranking/RankingAll/RankingAll.style';
import UserRankingList from '../UserRankingList/UserRankingList';

export default function RankingFriends() {
  const { data, loading, error, fetchMore, hasMore } = useGetRankingFriends();
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
