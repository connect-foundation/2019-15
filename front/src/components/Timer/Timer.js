import React, { useState, useEffect } from 'react';
import TimerStyle from './Timer.style';

const Timer = () => {
  const [time, setTime] = useState(30);
  const countDown = () => {
    setTime(time - 1);
  };

  function runTimer() {
    if (time > 0) setTimeout(countDown, 1000);
  }

  useEffect(() => {
    runTimer();
  });

  return (
    <TimerStyle>
      <span>{time}</span>
    </TimerStyle>
  );
};

export default Timer;
