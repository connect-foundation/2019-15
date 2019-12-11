import React from 'react';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import useGetRankingFriends from 'hooks/Ranking/useGetRankingFriends';
import RankingAllStyle from 'components/Ranking/RankingAll/RankingAll.style';
import { getRankingFriends } from 'queries/ranking';
import UserRankingList from '../UserRankingList/UserRankingList';
import UserRankingListStyle from '../UserRankingList/UserRankingList.style';

export default function RankingFriends() {
  const { data, loading, error, fetchMore, hasMore } = useGetRankingFriends(
    getRankingFriends,
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
