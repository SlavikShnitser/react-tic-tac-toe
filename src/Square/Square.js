import './Square.css';
import React from 'react';

const Square = (props) => {
  return (
    <button
      className={'square' + (props.winSquare ? ' win' : '')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;