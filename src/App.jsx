import { useState } from 'react'


const Square = ({value, onSquareClick}) => {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  )
}

const calculateWinner = (squares) => {
  const rules = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i=0; i < rules.length; i++) {
    const [a, b, c] = rules[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return false
}

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const newSquares = squares.slice();
  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  let status = ''

  if (winner) {
    status = 'Winner: ' + winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }
  // Ternary
  // status = winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O');

  const restart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className='wrapper'>
      <h1>{status}</h1>
      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
          ))}
      </div>
          <button className='btn' onClick={restart}>Restart</button>
    </div>
  );
}

export default App;