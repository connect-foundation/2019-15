import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { startPrivateGame } from 'logics/socketLogic';
import GlobalContext from 'global.context';
import { GameSettingStyle, StartBtn } from './GameSetting.style';

GameSetting.propTypes = {
  roomOwner: PropTypes.bool.isRequired,
  waitingUserList: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      socketId: PropTypes.string,
      avatar: PropTypes.number,
    }),
  ).isRequired,
};

export default function GameSetting({ roomOwner, waitingUserList }) {
  const { gameSocket, room } = useContext(GlobalContext);

  function clickStartBtn() {
    if (waitingUserList.length < 2) return;
    startPrivateGame(gameSocket, { roomId: room.roomId });
  }
  return (
    <GameSettingStyle>
      <StartBtn disabled={!roomOwner} onClick={clickStartBtn}>
        게임 시작
      </StartBtn>
    </GameSettingStyle>
  );
}
