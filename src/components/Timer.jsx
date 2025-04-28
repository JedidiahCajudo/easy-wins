import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import '/src/timer.css';

const Timer = () => {
  // Set the expiry time to 3 minutes from now
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180); // 180 seconds = 3 minutes

  // Initialize the timer with the expiration time and a callback when it ends
  const { seconds, minutes, start, reset, pause } = useTimer({
    expiryTimestamp,
    onExpire: () => alert('Time’s up!'),
  });

  return (
    <div>
      <p>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <div>
        <button onClick={start}>Start Timer</button>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={reset}>Reset Timer</button>
      </div>
    </div>
  );
};

export default Timer;
