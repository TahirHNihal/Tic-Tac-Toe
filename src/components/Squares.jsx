import React, { useState } from "react";
import x from "../assets/x.svg";
import o from "../assets/o.svg";

const Square = ({ value, onSquareClick }) => {
  let colorClass = "";
  let shadowClass = "";

  // Apply different colors based on the value
  if (value === "X") {
    colorClass = "text-blue-500";
    shadowClass = "#3B82F6";
  } else if (value === "O") {
    colorClass = "text-red-500";
    shadowClass = "#EF4444";
  }

  return (
    <>
      <button
        className={`text-center dark:bg-slate-500/10 h-24 w-24 border border-slate-500 dark:border-slate-200/20 text-6xl m-1 font-bold ${colorClass}`}
        style={{ textShadow: `-1px 1px 12px ${shadowClass}` }}
        onClick={onSquareClick}
      >
        <span>{value}</span>
      </button>
    </>
  );
};

export default Square;
