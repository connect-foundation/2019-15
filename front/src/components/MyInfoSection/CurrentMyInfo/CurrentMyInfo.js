import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import { getAvatar } from 'logics/avatar';
import { GET_RANK_BY_ID } from 'queries/ranking';
import { useQuery } from '@apollo/react-hooks';
import { CurrentMyInfoStyle, AvatarImage } from './CurrentMyInfo.style';

export default function CurrentMyInfo() {
  const { user } = useContext(GlobalContext);
  const { data, loading } = useQuery(GET_RANK_BY_ID);

  return (
    <CurrentMyInfoStyle id="CurrentMyInfo">
      <AvatarImage alt="avatar" src={getAvatar(user.avatar)} />
      <div>
        <span className="user-card nickname">{user.nickname}</span>
        <span className="user-card ranking">
          {loading ? null : `랭킹 ${data.getRankById.rank}위`}
        </span>
      </div>
    </CurrentMyInfoStyle>
  );
}
