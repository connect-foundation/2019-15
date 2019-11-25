import React, { useState, useEffect } from 'react';
import TimerStyle from './Timer.style';

const Timer = () => {
  const [time, setTime] = useState(30);
  const [flag, setFlag] = useState(false);
  const countDown = () => {
    setTime(time - 1);
  };

  function runTimer() {
    if (time > 0) setTimeout(countDown, 1000);
  }

  function triggerTimer() {
    setFlag(true);
    runTimer();
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
    </>
  );
};

export default Timer;
