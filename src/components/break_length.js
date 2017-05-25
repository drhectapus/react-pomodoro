import React from 'react';

const BreakLength = (props) => {
  return(
    <div className='increment-group'>
      <h5>Break Length</h5>
      <div className='buttons-group'>
        <button
          className='btn btn-danger'
          onClick={props.minusBreak}
        >
          -
        </button>
        <p>{props.breaktime}</p>
        <button
          className='btn btn-danger'
          onClick={props.addBreak}
        >
          +
        </button>
      </div>
    </div>
  );

}

export default BreakLength;
