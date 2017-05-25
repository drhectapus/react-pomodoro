import React from 'react';

const WorkLength = (props) => {
  return (
    <div className='increment-group'>
      <h5>Work Length</h5>
      <div className='buttons-group'>
        <button
          className='btn btn-danger'
          onClick={props.minusWork}
        >
          -
        </button>
        <p>{props.work}</p>
        <button
          className='btn btn-danger'
          onClick={props.addWork}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default WorkLength;
