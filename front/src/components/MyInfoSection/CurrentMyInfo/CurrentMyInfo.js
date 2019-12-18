import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import GlobalContext from 'global.context';
import CurrentMyInfoStyle from './CurrentMyInfo.style';
import { GET_RANKING_BY_ID } from '../../../queries/ranking';

export default function CurrentMyInfo() {
  const { user } = useContext(GlobalContext);
  const { loading, error, data } = useQuery(GET_RANKING_BY_ID, {
    variables: { id: user.id },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <CurrentMyInfoStyle id="CurrentMyInfo">
      <div>
        <span className="user-card nickname">{user.nickname}</span>
        <span className="user-card ranking">랭킹 {data.getRankingById}위</span>
      </div>
    </CurrentMyInfoStyle>
  );
}
