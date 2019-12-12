import React from 'react';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import { GET_RANKING_FRIENDS } from 'queries/ranking';
import useCursorQuery from 'hooks/useCursorQuery';
import { RankingAllStyle } from 'components/Ranking/RankingAll/RankingAll.style';
import UserRankingList from '../UserRankingList/UserRankingList';
import UserRankingListStyle from '../UserRankingList/UserRankingList.style';

export default function RankingFriends() {
  const { data, loading, error, fetchMore, hasMore } = useCursorQuery(
    GET_RANKING_FRIENDS,
  );
  if (loading) return <Loading Wrapper={UserRankingListStyle} />;
  if (error) return <Alert type="error" Wrapper={UserRankingListStyle} />;
  if (!data.length)
    return <Alert type="noData" Wrapper={UserRankingListStyle} />;

  return (
    <RankingAllStyle>
      <InfinityScroll loadMore={fetchMore} hasMore={hasMore}>
        <UserRankingList users={data} />
      </InfinityScroll>
    </RankingAllStyle>
  );
}
