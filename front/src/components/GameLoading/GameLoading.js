import React, { useContext } from 'react';
import FullScreen from './GameLoading.style';
import Loading from '../globalComponents/Loading/Loading';
import GamePlayContext from '../../pages/GamePlay/GamePlay.context';

const GameLoading = () => {
  const { userlist } = useContext(GamePlayContext);

  if (userlist.length <= 1) {
    return (
      <FullScreen>
        <Loading />
      </FullScreen>
    );
  }

  return <></>;
};

export default GameLoading;
