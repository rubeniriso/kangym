import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";

export default function KanjiResponseButton(props) {
  function handleHit() {
    //array.push(array.splice(index, 1)[0]);
    props.setButtonWasClicked(false);
    props.setCardTurn(false);
    props.setKanjiList(props.kanjiList.shift());
  }
  function handleMiss() {
    props.setButtonWasClicked(false);
    props.setCardTurn(false);
  }
  const ref = useRef(null);

  useEffect(() => {
    const handleKeyInput = (event) => {
      switch (event.code) {
        case "ArrowRight":
          handleMiss();
          break;
        case "ArrowLeft":
          handleHit();
          break;
      }
    };
    const element = ref.current;

    document.addEventListener("keydown", handleKeyInput);

    return () => {
      document.removeEventListener("keydown", handleKeyInput);
    };
  }, [props.buttonWasClicked]);

  function flipCard() {
    props.setCardTurn(!props.cardTurn);
  }

  return (
    <button
      onClick={props.buttonText === "Hit" ? handleHit : handleMiss}
      className="border border-gray-400 border-2 w-fit px-10 py-2 bg-white shadow-md hover:bg-wine-100 hover:text-white transition-colors duration-200 transform rounded-lg"
      id={props.buttonText === "Hit" ? "button-hit" : "button-miss"}
    >
      {props.buttonText}
    </button>
  );
}
