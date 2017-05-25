import React, { Component } from 'react';

const Timer = (props) => {
  const { secs, work, breaktime, startTimer, switchToBreak } = props;
  console.log('break?', switchToBreak);
  return (
    <div className='timer' onClick={startTimer}>
      <h2>{switchToBreak ? 'Break Time!' : 'Work Time!'}</h2>
      <h1>{switchToBreak ? breaktime : work}:{secs == 60 ? '00': secs}</h1>
    </div>
  );

}

export default Timer;
