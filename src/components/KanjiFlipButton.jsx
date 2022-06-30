import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

export default function KanjiFlipButton(props) {
  const handleClick = () => {
    props.setButtonWasClicked(true);
    props.setStory("Story");
    props.setCardTurn(true);
  }

  const handleKeyInput = (event) => {
    switch (event.code){
      case "Space":
        handleClick();
        break;
        case "Enter":
          handleClick();
          break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyInput);

    return () => {
      document.removeEventListener("keydown", handleKeyInput);
    };
  }, []);
  
  return (
    <button
      onClick={handleClick}
      className="border border-gray-400 border-2 w-fit px-10 py-2 bg-white shadow-md hover:bg-wine-100 hover:text-white transition-colors duration-200 transform rounded-lg"
      id={props.buttonId}
    >
      Flip
      {props.buttonText}
    </button>
  );
}
