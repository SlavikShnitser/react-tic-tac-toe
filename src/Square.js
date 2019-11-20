import React from 'react';

export function Square(props) {
  return (
    <button
      className={'square ' + (props.winSquare ? 'win' : '')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}