import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimerStyle from './Timer.style';

Timer.propTypes = {
  isTimerStart: PropTypes.bool.isRequired,
  setIsTimerStart: PropTypes.func.isRequired,
};

function Timer({ isTimerStart, setIsTimerStart }) {
  const [time, setTime] = useState(30);
  const [flag, setFlag] = useState(false);

  function resetTimer() {
    setTime(30);
  }

  useEffect(() => {
    // useCallback을 쓰면 hoisting이 되지 않아서 useEffect 내부에 선언함
    const countDown = () => {
      if (flag) setTime(time - 1);
    };

    function stopTimer() {
      setFlag(false);
      resetTimer();
    }

    function runTimer() {
      if (time > 0) setTimeout(countDown, 1000);
      else {
        stopTimer();
        setIsTimerStart(false);
        // to do something...
      }
    }

    function startTimer() {
      setFlag(true);
      runTimer();
    }

    runTimer();
    if (isTimerStart) startTimer();
  }, [isTimerStart, setIsTimerStart, time, flag]);

  return (
    <>
      <TimerStyle>
        <span>{time}</span>
      </TimerStyle>
    </>
  );
}

export default Timer;
