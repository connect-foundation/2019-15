import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import TimerStyle from './Timer.style';
import timerConfig from '../../constant/timerConfig';
import GamePlayContext from '../GamePlay/GamePlay.context';

Timer.propTypes = {
  isTimerGetReady: PropTypes.bool.isRequired,
  endTime: PropTypes.number.isRequired,
};

const getRemainTime = (endTime) => {
  const gap = Math.floor((endTime - Date.now()) / 1000);
  return gap >= 0 ? gap : 0;
};

export default function Timer({ isTimerGetReady, endTime }) {
  const { gameStateDispatch } = useContext(GamePlayContext);
  const [remainTime, setRemainTime] = useState(getRemainTime(endTime));
  const requestId = useRef(0);

  useEffect(() => {
    const resetTimer = () => {
      setRemainTime(getRemainTime(Date.now() + timerConfig.defaultExpireTime));
    };

    const countDown = () => {
      setRemainTime(getRemainTime(endTime));
      if (getRemainTime(endTime) <= 10)
        gameStateDispatch({ type: 'setIsLetterOpen', isLetterOpen: true });
      if (isTimerGetReady) requestId.current = requestAnimationFrame(countDown);
    };

    if (isTimerGetReady) requestId.current = requestAnimationFrame(countDown);
    else resetTimer();

    return () => {
      cancelAnimationFrame(requestId.current);
    };
  }, [endTime, isTimerGetReady]);

  return (
    <>
      <TimerStyle>
        <span>{remainTime}</span>
      </TimerStyle>
    </>
  );
}
