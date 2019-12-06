import React, { useContext } from 'react';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import FullScreen from './GameLoading.style';
import Loading from '../../globalComponents/Loading/Loading';

export default function GameLoading() {
  const { userList } = useContext(GamePlayContext);

  if (userList.length <= 1) {
    return (
      <FullScreen>
        <Loading />
      </FullScreen>
    );
  }

  return <></>;
}
