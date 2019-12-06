import React from 'react';

import classes from './square.module.css';

const Square = (props) => {
  const assignedClasses = [classes.square];
  if (props.winSquare) {
    assignedClasses.push(classes.win);
  }
  return (
    <button
      className={assignedClasses.join(' ')}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

export default Square;