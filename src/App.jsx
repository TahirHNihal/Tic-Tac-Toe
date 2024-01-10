import React, { useState } from "react";
import placeSound from "./assets/sounds/placeSound.mp3";
import clapSound from "./assets/sounds/clapSound.mp3";
import drawSound from "./assets/sounds/drawSound.wav";
import Board from "./components/Board";


const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  //Handle Play
  const handlePlay = (nextSquares) => {
    setXIsNext(!xIsNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  //Move
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Go to the move #${move}`;
    } else {
      description = `Go to start the game`;
    }

    //Jump To
    const jumpTo = (move) => {
      setCurrentMove(move);
      setXIsNext(move % 2 === 0);
    };

    return (
      <li
        className="text-center dark:bg-slate-500/10 p-2 border border-slate-500 dark:border-slate-200/20 text-[18px] dark:text-blue-400
       m-1 font-bold"
        key={move}
      >
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="h-screen bg-slate-300 dark:bg-slate-900 text-slate-800 dark:text-white flex justify-center items-center gap-20">
        <div className="h-full w-full flex justify-center items-center gap-20">
          <div className="w-50">
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
            />
          </div>
          <div className="w-50">
            <ol>{moves}</ol>
          </div>
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
      </div>
    </>
  );
};

export default App;

