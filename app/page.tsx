'use client'
import { useState } from "react";
export default function Board() {
  return (
    <>
      <section className="board-row">
        <Square />
        <Square />
        <Square />

      </section>
      <section className="board-row">
        <Square />
        <Square />
        <Square />
      </section>
      <section className="board-row">
        <Square />
        <Square />
        <Square />
      </section>
    </>


  )
}

function Square() {
  const [value, setValue] = useState("");

  function updateValue() {
    setValue("X");
  }
  return <button onClick={updateValue} className="square">{ value }</button>;

}