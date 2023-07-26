'use client';
import { useState } from "react";
export default function Board() {

  // define x is next or not state
  const [xIsNext, setXIsNext] = useState(true);
  // define squares state
  const [squares, setSquares] = useState(Array(9).fill(""));

  function handelClick(i: number) {
    // check if our current square has value or not
    if(squares[i]) return;
    
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
  return (
    <>
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

function Square({ value, onSquareClick }) {

  return <button onClick={onSquareClick} className="square">{ value }</button>;

}