import React from 'react';
import Loading from 'components/globalComponents/Loading/Loading';
import Alert from 'components/globalComponents/Alert/Alert';
import useCursorQuery from 'hooks/useCursorQuery';
import { GET_RANKING_ALL } from 'queries/ranking';
import InfinityScroll from 'components/globalComponents/InfinityScroll/InfinityScroll';
import UserRankingList from '../UserRankingList/UserRankingList';
import UserRankingListStyle from '../UserRankingList/UserRankingList.style';
import { RankingAllStyle, RankingAllScroll } from './RankingAll.style';

export default function RankingAll() {
  const { data, loading, error, fetchMore, hasMore } = useCursorQuery(
    GET_RANKING_ALL,
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
