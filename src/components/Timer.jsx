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
    <div className="timer-container">
      <p>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <div>
        <button className="start" onClick={start}>
          <i className="fa fa-play"></i>
        </button>
        <button className="done" onClick={pause}>
          <i className="fa fa-pause"></i>
        </button>
        <button className="done" onClick={reset}>
          <i className="fa fa-refresh"></i>
        </button>
      </div>
    </div>
  );
};

export default Timer;
