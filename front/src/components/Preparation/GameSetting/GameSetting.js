import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from 'global.context';
import useInput from 'hooks/Input/useInput';
import { GameSettingStyle, StartBtn } from './GameSetting.style';
import TimeSetting from './TimeSetting';
import RoundSetting from './RoundSetting';
import CategorySetting from './CategorySetting';

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
  useGameSocket('changeRoomSetting', ({ selectType, selectedIndex }) => {
    switch (selectType) {
      case 'timer': {
        changeTimerValue(selectedIndex);
        break;
      }
      case 'round': {
        changeRoundValue(selectedIndex);
        break;
      }
      case 'category': {
        changeCategoryValue(selectedIndex);
        break;
      }
      default:
        throw new Error();
    }
  });

  function clickStartBtn() {
    if (waitingUserList.length < 2) return;
    gameSocket.emit('startPrivateGame', {
      roomId: room.roomId,
      timer,
      round,
      category,
    });
  }

  return (
    <GameSettingStyle>
      <TimeSetting disabled={!roomOwner} onChangeTimer={onChangeTimer} />
      <RoundSetting disabled={!roomOwner} onChangeRound={onChangeRound} />
      <CategorySetting
        disabled={!roomOwner}
        onChangeCategory={onChangeCategory}
      />
      <StartBtn disabled={!roomOwner} onClick={clickStartBtn}>
        게임 시작
      </StartBtn>
    </GameSettingStyle>
  );
}
