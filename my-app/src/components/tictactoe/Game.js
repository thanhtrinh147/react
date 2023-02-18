import React, { useState } from "react";
import Board from "./Board";
import "./GameStyles.css";
import { calculateWinner } from "../../helpers";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [history, setHistory] = useState(Array(0));
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNum, setStepNum] = useState(0);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;

    let newH = [...history];
    console.log(stepNum);

    newH = newH.slice(0, stepNum + 1);

    newH.push(boardCopy);
    console.log(newH);
    setHistory(newH);
    console.log(history);
    boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
    setStepNum(stepNum + 1);
  };
  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setHistory(Array(0));
    setStepNum(0);
  };
  const jumpTo = (step) => {
    // setStepNum(step);
    // setXIsNext(step % 2 === 0);
    console.log(step);
    setBoard(history[step]);
    setXIsNext(step % 2 === 0 ? false : true);
    setStepNum(step);
  };

  return (
    <div>
      <Board cells={board} onClick={handleClick}></Board>
      <div className="game-status">
        {winner
          ? `Winner is: ${!xIsNext ? "X" : "O"}`
          : `Next play is: ${xIsNext ? "X" : "O"}`}
      </div>
      <button onClick={handleResetGame}> Reset Game</button>
      <div className="game-info">
        {history.map((item, index) => (
          //<li key={index}>
          <button key={index} onClick={() => jumpTo(index)}>
            Step: #{index + 1}
          </button>
          // </li>
        ))}
      </div>
    </div>
  );
};

export default Game;
