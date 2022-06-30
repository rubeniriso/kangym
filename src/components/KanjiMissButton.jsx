import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

export default function KanjiMissButton(props) {
  function handleMiss() {
    props.setButtonWasClicked(false);
    //props.setMeaning('');
  }

  return (
    <button
      onClick={handleMiss}
      className="border border-gray-400 border-2 w-fit px-10 py-2 bg-white shadow-md hover:bg-wine-100 hover:text-white transition-colors duration-200 transform rounded-lg"
      id={props.buttonId}
    >
      Miss
      {props.buttonText}
    </button>
  );
}
