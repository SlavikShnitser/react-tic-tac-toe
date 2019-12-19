import React from 'react';
import { Board } from '../Board/Board';
import { UserNameForm } from '../UserNameForm/UserNameForm';
import { MovesHistory } from '../MovesHistory/MovesHistory';
import { calculateWinner } from '../utils';

import classes from './game.module.css';

export class Game extends React.Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
        rowIndex: null,
        colIndex: null
      }
    ],
    stepNumber: 0,
    xIsNext: true,
    xPlayerName: 'Player 1',
    oPlayerName: 'Player 2'
  };

  clickHandler = (i) => {
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
  };

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  };

  nameChangeHandler = (isX, newName) => {
    this.setState({
      [isX ? 'xPlayerName' : 'oPlayerName']: newName
    });
  };

  getUserName = (label) => {
    return label === 'X' ? this.state.xPlayerName : this.state.oPlayerName;
  };

  getUserInfo = (label) => {
    return `${label} (${this.getUserName(label)})`;
  };

  getStatus = () => {
    const current = this.state.history[this.state.stepNumber];
    const winnerInfo = calculateWinner(current.squares);
    if (winnerInfo) {
      return `Winner: ${this.getUserInfo(winnerInfo.winner)}`;
    } else if (current.squares.every(s => s !== null)) {
      return 'Draw';
    } else {
      return `Next player: ${this.state.xIsNext ? this.getUserInfo('X') : this.getUserInfo('O')}`;
    }
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerInfo = calculateWinner(current.squares);

    return (
      <div className={classes['game']}>
        <div>
          <Board
            squares={current.squares}
            winLine={winnerInfo ? winnerInfo.line : null}
            onClick={this.clickHandler}
          />
        </div>
        <div className={classes['game-info']}>
          <div className={classes['status']}>{this.getStatus()}</div>
          <MovesHistory
            history={history}
            stepNumber={this.state.stepNumber}
            jumpTo={this.jumpTo}
          />
        </div>
        <div>
          <UserNameForm
            value={this.state.xPlayerName}
            onSubmit={this.nameChangeHandler.bind(this, true)}
          >
            User Name (X):
          </UserNameForm>

          <UserNameForm
            value={this.state.oPlayerName}
            onSubmit={this.nameChangeHandler.bind(this, false)}
          >
            User Name (O):
          </UserNameForm>
        </div>
      </div>
    );
  }
}
