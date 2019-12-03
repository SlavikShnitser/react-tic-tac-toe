import React from 'react';

import './MovesHistory.css';

export class MovesHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortMovesAsc: true
    };
  }

  sortChangeHandler = () => {
    this.setState({
      sortMovesAsc: !this.state.sortMovesAsc
    });
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
            className={move === this.props.stepNumber ? 'bold' : ''}
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
      <div>
        <ul>{moves}</ul>
        <button onClick={this.sortChangeHandler}>
          Sort moves ({this.state.sortMovesAsc ? 'OLD' : 'NEW'} FIRST)
        </button>
      </div>
    );
  }
}