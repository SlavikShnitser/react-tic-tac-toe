import React from 'react';
import { Board } from './Board'
import { UserNameForm } from './UserNameForm'
import { calculateWinner } from './utils';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          rowIndex: null,
          colIndex: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      sortMovesAsc: true,
      xPlayerName: 'Player 1',
      oPlayerName: 'Player 2'
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          rowIndex: Math.floor(i / 3),
          colIndex: i % 3
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  handleSortChange() {
    this.setState({
      ...this.state,
      sortMovesAsc: !this.state.sortMovesAsc
    });
  }

  handleNameChange(isX, newName) {
    this.setState({
      ...this.state,
      [isX ? 'xPlayerName' : 'oPlayerName']: newName
    });
  }

  getUserName(label) {
    return label === 'X' ? this.state.xPlayerName : this.state.oPlayerName;
  }

  getUserInfo(label) {
    return `${label} (${this.getUserName(label)})`;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerInfo = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} (${step.rowIndex}, ${step.colIndex})` :
        'Go to game start';
      return (
        <li key={move}>
          <button
            className={move === this.state.stepNumber ? 'bold' : ''}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    if (!this.state.sortMovesAsc) {
      moves.reverse();
    }

    let status;
    if (winnerInfo) {
      status = `Winner: ${this.getUserInfo(winnerInfo.winner)}`;
    } else if (current.squares.every(s => s !== null)) {
      status = 'Draw';
    } else {
      status = `Next player: ${this.state.xIsNext ? this.getUserInfo('X') : this.getUserInfo('O')}`
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            winLine={winnerInfo ? winnerInfo.line : null}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ul>{moves}</ul>
          <button onClick={() => this.handleSortChange()}>Sort moves {this.state.sortMovesAsc ? 'ASC' : 'DESC'}</button>
        </div>
        <div className='form-container'>
          <UserNameForm
            value={this.state.xPlayerName}
            playerLabel={'X'}
            onSubmit={(newName) => this.handleNameChange(true, newName)}
          />
          <UserNameForm
            value={this.state.oPlayerName}
            playerLabel={'O'}
            onSubmit={(newName) => this.handleNameChange(false, newName)}
          />
        </div>
      </div>
    );
  }
}
