import React from 'react';

import classes from './moves-history.module.css';

export class MovesHistory extends React.Component {
  state = {
    sortMovesAsc: true
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.history !== this.props.history
      || nextProps.stepNumber !== this.props.stepNumber
      || nextState.sortMovesAsc !== this.state.sortMovesAsc;
  }

  sortChangeHandler = () => {
    this.setState(prevState => ({
      sortMovesAsc: !prevState.sortMovesAsc
    }));
  };

  render() {
    const history = this.props.history;
    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${step.rowIndex}, ${step.colIndex})` :
        'Go to game start';
      return (
        <li key={move}>
          <button
            className={move === this.props.stepNumber ? classes.bold : ''}
            onClick={() => this.props.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    if (!this.state.sortMovesAsc) {
      moves.reverse();
    }

    return (
      <React.Fragment>
        <ul>{moves}</ul>
        <button onClick={this.sortChangeHandler}>
          Sort moves ({this.state.sortMovesAsc ? 'OLD' : 'NEW'} FIRST)
        </button>
      </React.Fragment>
    );
  }
}