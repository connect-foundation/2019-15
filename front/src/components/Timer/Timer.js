import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimerStyle from './Timer.style';

Timer.propTypes = {
  isTimerStart: PropTypes.bool.isRequired,
  setIsTimerStart: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default function Timer({ isTimerStart, setIsTimerStart, setIsOpen }) {
  const [time, setTime] = useState(30);
  const [isRunnable, setIsRunnable] = useState(false);

  function resetTimer() {
    setTime(30);
  }

  useEffect(() => {
    // useCallback을 쓰면 hoisting이 되지 않아서 useEffect 내부에 선언함
    const countDown = () => {
      if (isRunnable) setTime(time - 1);
    };

    function stopTimer() {
      setIsRunnable(false);
      resetTimer();
    }

    function notifyOpeningLetter() {
      setIsOpen(true);
    }

    function runTimer() {
      if (time === 10) notifyOpeningLetter();
      if (time > 0) setTimeout(countDown, 1000);
      else {
        stopTimer();
        setIsTimerStart(false);
        // to do something...
      }
    }

    function startTimer() {
      setIsRunnable(true);
      runTimer();
    }

    runTimer();
    if (isTimerStart) startTimer();
  }, [isTimerStart, setIsTimerStart, time, isRunnable, setIsOpen]);

  return (
    <>
      <TimerStyle>
        <span>{time}</span>
      </TimerStyle>
    </>
  );
}
