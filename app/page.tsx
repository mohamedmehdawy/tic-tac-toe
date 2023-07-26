'use client';
import { useState } from "react";
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(""));

  function handelClick(i: number) {
    const newArray = squares.slice();

    newArray[i] = "X";

    setSquares(newArray);
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