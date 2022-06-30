import KanjiCard from "../components/KanjiCard";
import KanjiFlipButton from "../components/KanjiFlipButton";
import KanjiResponseButton from "../components/KanjiResponseButton";
import { AuthContext } from "../context/auth.context";
import { getKanjiService } from "../services/kanji.services";
import uuid from 'react-uuid'
import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

export default function Kanji() {
  const [meaning, setMeaning] = useState();
  const [story, setStory] = useState();
  const [buttonWasClicked, setButtonWasClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [cardTurn, setCardTurn] = useState(true);
  const { user } = useContext(AuthContext);
  const [character, setCharacter] = useState("");
  const [kanjiList, setKanjiList] = useState([]);

  const location = useLocation();
  const [singleButton, setSingleButton] = useState(
    <KanjiFlipButton
      setButtonWasClicked={setButtonWasClicked}
      kanjiList = {kanjiList}
      setStory={setStory}
      buttonWasClicked={buttonWasClicked}
      setCardTurn={setCardTurn}
    />
  );
  const [buttonArray, setButtonArray] = useState([
    <KanjiResponseButton
      setCharacter={setCharacter}
      setButtonWasClicked={setButtonWasClicked}
      buttonWasClicked={buttonWasClicked}
      buttonText={"Hit"}
      setCardTurn={setCardTurn}
      kanjiList = {kanjiList}
      setKanjiList = {setKanjiList}
    />,
    <KanjiResponseButton
      setCharacter={setCharacter}
      setButtonWasClicked={setButtonWasClicked}
      buttonWasClicked={buttonWasClicked}
      buttonText={"Miss"}
      setCardTurn={setCardTurn}
      kanjiList = {kanjiList}
      setKanjiList = {setKanjiList}
    />,
  ]);
  useEffect(() => {
    getKanjisFromAPI();
  }, []);
  const getKanjisFromAPI = async () => {
    try {
      const response = await getKanjiService(user.id);
      setKanjiList(response.data);      
      setCharacter(response.data[0]['kanji']);
      setMeaning(response.data[0]['meaning']);
    } catch (error) {
      console.log(error);
    }
  }
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
            ? buttonArray.map((e) => <div key={uuid()}>{e}</div>)
            : singleButton}
        </div>
      </div>
    </>
  );
}
