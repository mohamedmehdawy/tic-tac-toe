'use client';
import { MouseEventHandler, useState } from "react";

export default function Game() {


  // define game history
  const [history, setHistory] = useState([Array(9).fill("")]);

  // current move
  const [currentMove, setCurrentMove] = useState(0);

  // define x is next or not state
  const xIsNext = currentMove % 2 == 0;
  // current squares
  const currentSquares = history[currentMove];

  // handel play
  function handelPlay(nextSquares: string[]) {
    // create new history
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // set history
    setHistory(newHistory);

    // set current move less than new history - 1, to arrive to correct index
    setCurrentMove(newHistory.length - 1);

  }
  
  // jump to
  function jumpTo(nextMove: number) {
    // change current move
    setCurrentMove(nextMove);

  }
  // moves
  const moves = history.map((squares, move) => {
    // description message
    let description;

    if (move > 0) {
      description = `Go move to # ${move}`
    } else {
      description = `Go to start game`
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{ description }</button>
      </li>
    )
  });
  return (
    <>
      <section className="game">
        <section className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handelPlay}/>
        </section>
        <section className="game-info">
          <p>you are move # { currentMove }</p>
          <ol>{ moves }</ol>
        </section>
      </section>
    </>
  )
}
function Board({xIsNext, squares, onPlay}: {
  xIsNext: boolean;
  squares: string[];
  onPlay: Function
}) {


  function handelClick(i: number) {
    console.log(`square is: ${i}`)
    // check if our current square has value or not
    if(squares[i] || calcWinner(squares)) return;

    // create copy of our array
    const newArray = squares.slice();

    // check x boolean value
    if (xIsNext) {
      newArray[i] = "X";

    } else {
      newArray[i] = "O";
    }

    // handel play
    onPlay(newArray);
  }

  // handel winner
  const winnerData = calcWinner(squares);

  const winner = winnerData ? winnerData[0] : null;
  let status;

  if(winner) {
    status = `winner is: ${winner}`;
    
  } else {
    status = `next player is: ${xIsNext? 'X':'O'}`;
  }

  const boards = Array(3);
  let currentSqaure = 0;
  for(let i = 0; i < 3; i++) {
    boards[i] = [];
    for(let j = 0; j < 3; j++) {
      const current = currentSqaure;
      boards[i].push(<Square key={currentSqaure} value={squares[currentSqaure]} onSquareClick={() => handelClick(current)}/>)
      currentSqaure += 1;

    }
    boards[i] = (
      <section className="board-row" key={i}>
        {boards[i]}
      </section>
    )
  }
  

  
  return (
    <>
      <section className="status">{ status }</section>
      {boards}
    </>


  )
}

function Square({ value, onSquareClick }: {
  value: string;
  onSquareClick: MouseEventHandler<HTMLButtonElement>
}) {

  return <button onClick={onSquareClick} className="square">{ value }</button>;

}

function calcWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // check is the squares match any line
  for(let i = 0; i < lines.length; i++) {
    // set current 3 points
    const [a, b, c] = lines[i];

    if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return [squares[a], [a,b,c]];
    }
  }
  return null;
}