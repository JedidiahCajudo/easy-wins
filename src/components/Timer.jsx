import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

const Timer = () => {
  // Get the current time and set the expiry time to 3 minutes from now
  const time = new Date();
  time.setSeconds(time.getSeconds() + 180); // 180 seconds = 3 minutes

  // Initialize the timer with the expiration time and a callback when it ends
  const { seconds, minutes, start, reset, pause } = useTimer({
    expiryTimestamp: time,
    onExpire: () => alert('Time’s up!'),
  });

  return (
    <div>
      <h2>Easy Wins Timer</h2>
      <p>
        Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
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
