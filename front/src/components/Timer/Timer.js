import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import TimerStyle from './Timer.style';

const Timer = forwardRef((props, ref) => {
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

  function startTimer() {
    setFlag(true);
    runTimer();
  }

  function resetTimer() {
    setTime(30);
  }

  function stopTimer() {
    setFlag(false);
    resetTimer();
  }

  useEffect(() => {
    if (flag) runTimer();
  });

  useImperativeHandle(ref, () => ({
    triggerTimer() {
      startTimer();
    },
  }));

  return (
    <>
      <TimerStyle>
        <span>{time}</span>
      </TimerStyle>
    </>
  );
});

export default Timer;
