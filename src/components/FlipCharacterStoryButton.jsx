import React from "react";
import { useRef, useEffect } from "react";

export default function FlipCharacterStoryButton(props) {

  const handleClick = (event) => {
    flipCard();
  };
  const handleKeyInput = (event) => {
    if (event.code === "KeyR") flipCard();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyInput);

    return () => {
      document.removeEventListener("keydown", handleKeyInput);
    };
  }, [props.cardTurn]);

  function flipCard() {
    props.setCardTurn(!props.cardTurn);
  }

  return (
    <button  className="absolute right-2 top-2 w-[20px] h-auto" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0"
        y="0"
        enableBackground="new 0 0 214.367 214.367"
        version="1.1"
        viewBox="0 0 214.367 214.367"
        xmlSpace="preserve"
        className="fit"
      >
        <path d="M202.403 95.22c0 46.312-33.237 85.002-77.109 93.484v25.663l-69.76-40 69.76-40v23.494c27.176-7.87 47.109-32.964 47.109-62.642 0-35.962-29.258-65.22-65.22-65.22s-65.22 29.258-65.22 65.22c0 9.686 2.068 19.001 6.148 27.688l-27.154 12.754c-5.968-12.707-8.994-26.313-8.994-40.441C11.964 42.716 54.68 0 107.184 0s95.219 42.716 95.219 95.22z"></path>
      </svg>
    </button>
  );
}

