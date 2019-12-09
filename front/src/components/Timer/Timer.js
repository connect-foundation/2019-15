import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimerStyle from './Timer.style';

Timer.propTypes = {
  isTimerGetReady: PropTypes.bool.isRequired,
  setIsTimerGetReady: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  endTime: PropTypes.number.isRequired,
  setEndTime: PropTypes.func.isRequired,
};

function getRemainTime(endTime) {
  const gap = Math.floor((endTime - Date.now()) / 1000);
  return gap >= 0 ? gap : 0;
}

export default function Timer({
  isTimerGetReady,
  setIsTimerGetReady,
  setIsOpen,
  endTime,
  setEndTime,
}) {
  const [expireTime, setExpireTime] = useState(30000);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    function notifyOpeningLetter() {
      setIsOpen(true);
    }

    function stopTimer() {
      setIsTimerGetReady(false);
      cancelAnimationFrame(requestId);
      // setEndTime(0);
    }

    function runTimer() {
      if (getRemainTime(endTime) <= 10) notifyOpeningLetter();
      if (getRemainTime(endTime) > 0)
        setRequestId(requestAnimationFrame(runTimer));
      else stopTimer();
    }

    if (isTimerGetReady) setRequestId(requestAnimationFrame(runTimer));
    else stopTimer();
  }, [
    isTimerGetReady,
    setIsTimerGetReady,
    setIsOpen,
    setEndTime,
    endTime,
    requestId,
  ]);

  return (
    <>
      <TimerStyle>
        <span>{getRemainTime(endTime)}</span>
      </TimerStyle>
    </>
  );
}
