import React, { useState } from "react";
import Squares from "./Squares";
import placeSound from "../assets/sounds/placeSound.mp3";
import clapSound from "../assets/sounds/clapSound.mp3";
import drawSound from "../assets/sounds/drawSound.wav";
import wrongSound from "../assets/sounds/wrongSound.wav";
import Square from "./Squares";

const Board = ({ xIsNext, squares, onPlay }) => {
  const winner = claculateWinner(squares);
  console.log(winner);

  let status;
  if (winner === "Draw") {
    status = `Match: ${winner}`;
    document.getElementById("drawSound").play();
  } else if (winner) {
    document.getElementById("clapSound").play();
    status = `Winner: ${winner}`;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }
  const handClick = (i) => {
    document.getElementById("placeSound").play();
    if (squares[i] || claculateWinner(squares)) {
    document.getElementById("wrongSound").play();
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };
  return (
    <>
      <div className="">
        <h1 className="text-3xl mb-5">{status}</h1>
        <div className="flex">
          <Square value={squares[0]} onSquareClick={() => handClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handClick(2)} />
        </div>
        <div className="flex">
          <Square value={squares[3]} onSquareClick={() => handClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handClick(5)} />
        </div>
        <div className="flex">
          <Square value={squares[6]} onSquareClick={() => handClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handClick(8)} />
        </div>
        <audio
          src={placeSound}
          id="placeSound"
          controls
          className="hidden opacity-0 invisible"
        ></audio>
        <audio
          src={clapSound}
          id="clapSound"
          controls
          className="hidden opacity-0 invisible"
        ></audio>
        <audio
          src={drawSound}
          id="drawSound"
          controls
          className="hidden opacity-0 invisible"
        ></audio>
        <audio
          src={wrongSound}
          id="wrongSound"
          controls
          className="hidden opacity-0 invisible"
        ></audio>
      </div>
    </>
  );
};

export default Board;

const claculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winning player (X or O)
    }
  }

  // Check for a draw
  if (squares.every((square) => square !== null)) {
    return "Draw";
  }

  // If no winner or draw, return null
  return null;
};
