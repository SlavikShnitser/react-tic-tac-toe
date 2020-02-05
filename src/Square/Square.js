import React from 'react';
import PropTypes from 'prop-types';

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

Square.propTypes = {
  value: PropTypes.string,
  winSquare: PropTypes.bool,
  onClick: PropTypes.func
};

export default Square;