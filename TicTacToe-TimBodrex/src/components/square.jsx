import { useState } from "react";
import "./Square.css";

function Square() {
  return (
    <div
      onClick={clickOnSquare}
      className={`square ${finishedState ? "not-allowed" : ""}
      ${currentPlayer !== playingAs ? "not-allowed" : ""}
       ${finishedArrayState.includes(id) ? finishedState + "-won" : ""}
       ${finishedState && finishedState !== playingAs ? "grey-background" : ""}
       `}
    >
      {currentElement === "circle" ? circleSvg : currentElement === "cross" ? crossSvg : icon}
    </div>
  );
}

export default Square;
