import { useState } from 'react';
import Board from './Board';
import './index.css';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "It's a draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <Board squares={squares} onClick={handleClick} />
      <div className="status">{status}</div>
      <button className="restart-btn" onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default App;


