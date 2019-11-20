import React from 'react';

export class MovesHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sortMovesAsc: true
    };

    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange() {
    this.setState({
      sortMovesAsc: !this.state.sortMovesAsc
    });
  }

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
        <button onClick={this.handleSortChange}>
          Sort moves {this.state.sortMovesAsc ? 'ASC' : 'DESC'}
        </button>
      </div>
    );
  }
}