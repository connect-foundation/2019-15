import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from 'global.context';
import useGameSocket from 'hooks/Socket/useGameSocket';
import useSelect from 'hooks/Select/useSelect';
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
  const [timer, onChangeTimer, timerRef, changeTimerValue] = useSelect('timer');
  const [round, onChangeRound, roundRef, changeRoundValue] = useSelect('round');
  const [
    category,
    onChangeCategory,
    categoryRef,
    changeCategoryValue,
  ] = useSelect('category');

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
      <TimeSetting
        disabled={!roomOwner}
        onChangeTimer={onChangeTimer}
        timerRef={timerRef}
      />
      <RoundSetting
        disabled={!roomOwner}
        onChangeRound={onChangeRound}
        roundRef={roundRef}
      />
      <CategorySetting
        disabled={!roomOwner}
        onChangeCategory={onChangeCategory}
        categoryRef={categoryRef}
      />
      <StartBtn disabled={!roomOwner} onClick={clickStartBtn}>
        게임 시작
      </StartBtn>
    </GameSettingStyle>
  );
}
