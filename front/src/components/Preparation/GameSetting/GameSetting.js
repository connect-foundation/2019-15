import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import GlobalContext from 'global.context';
import useGameSocket from 'hooks/Socket/useGameSocket';
import useSelect from 'hooks/Setting/useSelect';
import { GameSettingStyle, StartBtn } from './GameSetting.style';
import TimeSetting from './TimeSetting';
import RoundSetting from './RoundSetting';
import CategorySetting from './CategorySetting';

GameSetting.propTypes = {
  isRoomOwner: PropTypes.bool.isRequired,
  waitingUserList: PropTypes.arrayOf(
    PropTypes.shape({
      nickname: PropTypes.string,
      socketId: PropTypes.string,
      avatar: PropTypes.number,
    }),
  ).isRequired,
};

const defaultTime = '40';
const defaultRound = '3';
const defaultCategoryId = '8';

export default function GameSetting({ isRoomOwner, waitingUserList }) {
  const { gameSocket, room } = useContext(GlobalContext);
  const [timer, onChangeTimer, timerRef, changeTimerValue] = useSelect(
    'timer',
    defaultTime,
  );
  const [round, onChangeRound, roundRef, changeRoundValue] = useSelect(
    'round',
    defaultRound,
  );
  const [
    categoryId,
    onChangeCategory,
    categoryRef,
    changeCategoryValue,
  ] = useSelect('category', defaultCategoryId);

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

  const clickStartBtn = () => {
    if (waitingUserList.length < 2) return;
    gameSocket.emit('startPrivateGame', {
      roomId: room.roomId,
      expireTime: timer,
      round,
      categoryId,
    });
  };

  return (
    <GameSettingStyle>
      <TimeSetting
        disabled={!isRoomOwner}
        onChangeTimer={onChangeTimer}
        timerRef={timerRef}
        defaultOption={timer}
      />
      <RoundSetting
        disabled={!isRoomOwner}
        onChangeRound={onChangeRound}
        roundRef={roundRef}
        defaultOption={round}
      />
      <CategorySetting
        disabled={!isRoomOwner}
        onChangeCategory={onChangeCategory}
        categoryRef={categoryRef}
        defaultOption={categoryId}
      />
      <StartBtn disabled={!isRoomOwner} onClick={clickStartBtn}>
        게임 시작
      </StartBtn>
    </GameSettingStyle>
  );
}
