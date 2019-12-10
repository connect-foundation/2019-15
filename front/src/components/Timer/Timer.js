import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import TimerStyle from './Timer.style';

Timer.propTypes = {
  isTimerGetReady: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  endTime: PropTypes.number.isRequired,
};

function getRemainTime(endTime) {
  const gap = Math.floor((endTime - Date.now()) / 1000);
  return gap >= 0 ? gap : 0;
}

export default function Timer({ isTimerGetReady, setIsOpen, endTime }) {
  const [remainTime, setRemainTime] = useState(getRemainTime(endTime));
  const requestId = useRef(0);

  useEffect(() => {
    function resetTimer() {
      setRemainTime(getRemainTime(Date.now() + 30000));
    }

    function countDown() {
      setRemainTime(getRemainTime(endTime));
      if (getRemainTime(endTime) <= 10) setIsOpen(true);
      if (isTimerGetReady) requestId.current = requestAnimationFrame(countDown);
    }

    if (isTimerGetReady) requestId.current = requestAnimationFrame(countDown);
    else resetTimer();

    return () => {
      cancelAnimationFrame(requestId.current);
    };
  }, [isTimerGetReady]);

  return (
    <>
      <TimerStyle>
        <span>{remainTime}</span>
      </TimerStyle>
    </>
  );
}
