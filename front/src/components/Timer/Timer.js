import React, { useState, useEffect } from 'react';
import TimerStyle from './Timer.style';

const Timer = () => {
  const [time, setTime] = useState(30);
  const [flag, setFlag] = useState(false);

  const countDown = () => {
    if (flag) setTime(time - 1);
  };

  function runTimer() {
    if (time > 0) setTimeout(countDown, 1000);
    else {
      // to do something...
    }
  }

  function triggerTimer() {
    setFlag(true);
    runTimer();
  }

  function resetTimer() {
    setFlag(false);
    setTime(30);
  }

  useEffect(() => {
    if (flag) runTimer();
  });

  return (
    <>
      <TimerStyle>
        <span>{time}</span>
      </TimerStyle>
      <button onClick={triggerTimer}>trigger</button>
      <button onClick={resetTimer}>reset</button>
    </>
  );
};

export default Timer;
