import KanjiCard from "../components/KanjiCard";
import KanjiFlipButton from "../components/KanjiFlipButton";
import KanjiResponseButton from "../components/KanjiResponseButton";
import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

export default function Kanji() {
  const [meaning, setMeaning] = useState();
  const [story, setStory] = useState();
  const [character, setCharacter] = useState("天");
  const [buttonWasClicked, setButtonWasClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [cardTurn, setCardTurn] = useState(true);

  const [singleButton, setSingleButton] = useState(
    <KanjiFlipButton
      setButtonWasClicked={setButtonWasClicked}
      setMeaning={setMeaning}
      setStory={setStory}
      buttonWasClicked={buttonWasClicked}
      setCardTurn={setCardTurn}
    />
  );
  const [buttonArray, setButtonArray] = useState([
    <KanjiResponseButton
      key={"0"}
      setCharacter={setCharacter}
      setButtonWasClicked={setButtonWasClicked}
      buttonWasClicked={buttonWasClicked}
      buttonText={"Hit"}
      setCardTurn={setCardTurn}
    />,
    <KanjiResponseButton
      key={"1"}
      setCharacter={setCharacter}
      setButtonWasClicked={setButtonWasClicked}
      buttonWasClicked={buttonWasClicked}
      buttonText={"Miss"}
      setCardTurn={setCardTurn}
    />,
  ]);

  return (
    <>
      <div className="bg-cream-100 h-full flex place-items-center place-content-center flex-wrap flex-col gap-[150px]">
        <KanjiCard
          key={"1"}
          character={character}
          story={story}
          meaning={meaning}
          buttonWasClicked={buttonWasClicked}
          cardTurn={cardTurn}
          setCardTurn={setCardTurn}
        />
        <div className="flex flex-row" id="button-div">
          {buttonWasClicked
            ? buttonArray.map((e) => <div>{e}</div>)
            : singleButton}
        </div>
      </div>
    </>
  );
}
