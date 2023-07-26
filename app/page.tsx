'use client';
import { MouseEventHandler, useState } from "react";
export default function Board() {

  // define x is next or not state
  const [xIsNext, setXIsNext] = useState(true);
  // define squares state
  const [squares, setSquares] = useState(Array(9).fill(""));

  function handelClick(i: number) {
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

    // set new array
    setSquares(newArray);

    // change x is next
    setXIsNext(!xIsNext);
  }

  // handel winner
  const winner = calcWinner(squares);
  let status;

  if(winner) {
    status = `winner is: ${winner}`;
  } else {
    status = `next player is: ${xIsNext? 'X':'O'}`;
  }
  return (
    <>
      <section className="status">{ status }</section>
      <section className="board-row">
        <Square value={squares[0]} onSquareClick={() => handelClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handelClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handelClick(2)}/>

      </section>
      <section className="board-row">
        <Square value={squares[3]} onSquareClick={() => handelClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handelClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handelClick(5)}/>
      </section>
      <section className="board-row">
        <Square value={squares[6]} onSquareClick={() => handelClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handelClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handelClick(8)}/>
      </section>
    </>


  )
}

function Square({ value, onSquareClick }: {
  value: string;
  onSquareClick: MouseEventHandler<HTMLButtonElement>
}) {

  return <button onClick={onSquareClick} className="square">{ value }</button>;

}

function calcWinner(squares: string[]): null | string {
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
      return squares[a];
    }
  }
  return null;
}