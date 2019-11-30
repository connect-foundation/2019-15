import React, { useContext } from 'react';
import GamePlayContext from 'GamePlay.context';
import FullScreen from './GameLoading.style';
import Loading from '../globalComponents/Loading/Loading';

const GameLoading = () => {
  const { userList } = useContext(GamePlayContext);

  if (userList.length <= 1) {
    return (
      <FullScreen>
        <Loading />
      </FullScreen>
    );
  }

  return <></>;
};

export default GameLoading;
