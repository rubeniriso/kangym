import { useState, useEffect } from "react";
import FlipCharacterStoryButton from './FlipCharacterStoryButton';
export default function KanjiCard(props) {
  useEffect(() => {
    props.setCardTurn(!props.cardTurn);
  }, []);
  return (
    <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg border  shadow-2xl dark:bg-gray-800 flex flex-wrap flex-col w-[500px]">
      {/*<img class="object-cover object-center w-full h-56" src="../assets/kanji.jpg">天</img>*/}
      <div className="h-[300px] relative">
        {props.buttonWasClicked ? <FlipCharacterStoryButton setCardTurn = {props.setCardTurn} cardTurn ={props.cardTurn}/> : ""}
        <p className={`flex flex-col w-full h-full p-6 text-center ${props.cardTurn ? 'text-justify' : 'justify-center text-[200px]'}`} id="kanji-character">
          {props.cardTurn ? props.story : props.character}
        </p>
      </div>
      {/*Meaning*/}
      <div className="flex items-center py-3 bg-wine-100">
        <svg
          className="w-6 h-7 text-white fill-current"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z"
          />
        </svg>

        <h1 className="mx-3 text-lg font-semibold text-white" id="kanji-meaning">
          {props.buttonWasClicked ? props.meaning : ""}
        </h1>
      </div>
    </div>
  );
}
