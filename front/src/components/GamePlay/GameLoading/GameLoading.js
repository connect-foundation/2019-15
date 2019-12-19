import React, { useContext } from 'react';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import FullScreen from './GameLoading.style';
import Loading from '../../globalComponents/Loading/Loading';

export default function GameLoading() {
  const { gameState } = useContext(GamePlayContext);
  const { userList } = gameState;

  if (userList.length <= 1) {
    return <Loading Wrapper={FullScreen} />;
  }

  return <></>;
}
