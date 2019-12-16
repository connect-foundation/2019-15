import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from 'global.context';
import timerConfig from 'constant/timerConfig';
import Select from 'components/globalComponents/Select/Select';
import useInput from 'hooks/Input/useInput';
import { roundOption } from 'constant/room/roomInfo';
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
  const [timer, onChangeTimer] = useInput();
  const [round, onChangeRound] = useInput();
  function clickStartBtn() {
    if (waitingUserList.length < 2) return;
    gameSocket.emit('startPrivateGame', { roomId: room.roomId, timer, round });
  }

  return (
    <GameSettingStyle>
      {'게임 시간'}
      <Select
        option={timerConfig.timerOption}
        defaultOption={timerConfig.defaultExpireTime / 1000}
        onChange={onChangeTimer}
      />
      {'라운드'}
      <Select option={roundOption} defaultOption={3} onChange={onChangeRound} />
      <StartBtn disabled={!roomOwner} onClick={clickStartBtn}>
        게임 시작
      </StartBtn>
    </GameSettingStyle>
  );
}
