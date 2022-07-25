import KanjiCard from "../components/KanjiCard";
import KanjiFlipButton from "../components/KanjiFlipButton";
import { AuthContext } from "../context/auth.context";
import { getKanjiService, changeKanjiDateService } from "../services/kanji.services";
import uuid from "react-uuid";
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

  useEffect(() => {
    getKanjisFromAPI();
  }, []);

  /*function handleHit() {
    setButtonWasClicked(false);
    setCardTurn(false);
    changeKanjiDate();
    setKanjiList(kanjiList.shift());
    console.log(kanjiList);
  }
*/
  const handleHit = async () => {
    setButtonWasClicked(false);
    setCardTurn(false);
    //changeKanjiDate();
    if (kanjiList.length === 1){
      //FINISHED
    } else{
      let auxKanjiList = kanjiList.shift();
    }
    setCharacter(kanjiList[0]["kanji"]);
    setMeaning(kanjiList[0]["meaning"]);
  }

  function handleMiss() {
    setButtonWasClicked(false);
    setCardTurn(false);
    //changeKanjiDate();
    let auxKanjiList = kanjiList.shift();
    kanjiList.push(auxKanjiList);
    console.log(kanjiList);
    setCharacter(kanjiList[0]["kanji"]);
    setMeaning(kanjiList[0]["meaning"]);
  }
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

    document.addEventListener("keydown", handleKeyInput);

    return () => {
      document.removeEventListener("keydown", handleKeyInput);
    };
  }, [buttonWasClicked]);

  function flipCard() {
    setCardTurn(!cardTurn);
  }

  const getKanjisFromAPI = async () => {
    try {
      const response = await getKanjiService(user.id);
      setKanjiList(response.data);
      setCharacter(response.data[0]["kanji"]);
      setMeaning(response.data[0]["meaning"]);
    } catch (error) {
      console.log(error);
    }
  };

  const changeKanjiDate = async () => {
    try{
      const response = await changeKanjiDateService(kanjiList[0]);
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
            ? [
                <button
                  onClick={handleHit}
                  className="border border-gray-400 border-2 w-fit px-10 py-2 bg-white shadow-md hover:bg-wine-100 hover:text-white transition-colors duration-200 transform rounded-lg"
                  id={"button-hit"}
                >
                  Hit
                </button>,
                <button
                  onClick={handleMiss}
                  className="border border-gray-400 border-2 w-fit px-10 py-2 bg-white shadow-md hover:bg-wine-100 hover:text-white transition-colors duration-200 transform rounded-lg"
                  id={"button-miss"}
                >
                  Miss
                </button>,
              ]
            : <KanjiFlipButton
            setButtonWasClicked={setButtonWasClicked}
            kanjiList={kanjiList}
            setStory={setStory}
            buttonWasClicked={buttonWasClicked}
            setCardTurn={setCardTurn}
          />}
        </div>
      </div>
    </>
  );
}
