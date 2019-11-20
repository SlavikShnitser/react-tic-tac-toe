import React from 'react';
import { Square } from './Square';

export class Board extends React.Component {
  renderSquare(i) {
    const isWinSquare = this.props.winLine ?
      this.props.winLine.indexOf(i) !== -1 :
      false;

    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        winSquare={isWinSquare}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const rows = [0, 1, 2].map((rowIndex) => {
      const squares = [0, 1, 2].map((colIndex) => {
        return this.renderSquare(rowIndex * 3 + colIndex);
      });
      return (
        <div
          key={rowIndex}
          className='board-row'
        >
          {squares}
        </div>
      );
    });
    return <div>{rows}</div>;
  }
}