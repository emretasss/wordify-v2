import axios from 'axios';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import './Final.css';

const Final = () => {
  const [state, setState] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [number, setNumber] = useState(0);
  const [inputData, setInputData] = useState([]);
  const [editState, setEditState] = useState(false);
  const [inputWord, setInputWord] = useState('');
  const [index, setIndex] = useState();

  const username = JSON.parse(localStorage.getItem('user'));
  const savedState = JSON.parse(sessionStorage.getItem('myState'));
  const userId = username._id;
  const allQuestionId = savedState.data._id;

  const baseURL = "https://server-three-taupe.vercel.app/api/items";
  const location = useLocation();

  useEffect(() => {
    const inputDataFromLocation = location.state?.inputData || [];
    setInputData(inputDataFromLocation);
    setIndex(localStorage.getItem('indexSet'));
  }, [location.state]);

  const currentData = inputData[number] || {};
  const { questions: currentQuestion, answers: currentAnswer, image: currentImage, sentence: currentSentence, _id } = currentData;
  const displayedText = state ? currentAnswer : currentQuestion;

  const toggleState = () => {
    if (!editState) {
      setState(!state);
    }
    setInputWord(displayedText);
  };

  const handleNext = () => {
    setNumber((prevNumber) => (prevNumber < inputData.length - 1 ? prevNumber + 1 : 0));
    setState(false);
    setShowAnswer(false);
  };

  const handlePrev = () => {
    setNumber((prevNumber) => (prevNumber > 0 ? prevNumber - 1 : inputData.length - 1));
    setState(false);
    setShowAnswer(false);
  };

  const toggleEditState = async () => {
    if (editState) {
      try {
        const response = await axios.post(`${baseURL}/saveEdit`, {
          _id: userId,
          item: inputWord,
          questionSetId: _id,
          allQuestionId,
          state,
        });

        if (response.status === 200) {
          const updatedData = inputData.map((item, idx) => {
            if (idx === number) {
              state ? item.answers = inputWord : item.questions = inputWord;
            }
            return item;
          });
          setInputData(updatedData);
        } else {
          console.error('Failed to save changes:', response.status);
        }
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }
    setEditState(!editState);
  };

  const handleInputChange = (e) => {
    setInputWord(e.target.value);
  };

  const shuffleData = () => {
    const shuffledData = [...inputData];
    for (let i = shuffledData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledData[i], shuffledData[j]] = [shuffledData[j], shuffledData[i]];
    }
    setInputData(shuffledData);
    setNumber(0);
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      let voices = synth.getVoices();

      if (voices.length === 0) {
        synth.onvoiceschanged = () => {
          voices = synth.getVoices();
          speak(text, voices);
        };
      } else {
        speak(text, voices);
      }
    } else {
      console.error('SpeechSynthesis API not supported in this browser');
    }
  };

  const speak = (text, voices) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    const femaleVoice = voices.find(voice => voice.lang === 'en-US' && /female/i.test(voice.name));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }
    utterance.onend = () => setShowAnswer(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="cover-final">
      <div id="saveBox" className='simpleBox'>
        <p>Items saved!</p>
      </div>
      <div className="all-card">
        <button className="butonEdit" onClick={toggleEditState}>{editState ? "Done" : "Edit"}</button>
        <div className='quizCard' onClick={toggleState}>
          <div className="front">
            {!showAnswer && (
              <>
                <p className="p-afisare">{currentQuestion}</p>
                <button className="speakButton" onClick={(e) => { e.stopPropagation(); speakText(currentQuestion); }}>Speak</button>
              </>
            )}
            <p className="p-numbering">{number + 1}/{inputData.length}</p>
          </div>
          {showAnswer && !editState && (
            <div className="back">
              <img src={currentImage} alt="Answer" className="image" />
              <p>{currentAnswer}</p>
              <p>{currentSentence}</p>
              <button className="speakButton" onClick={(e) => { e.stopPropagation(); speakText(currentAnswer); }}>Speak</button>
            </div>
          )}
        </div>
        <div className="spread-apart">
          <button className='prevButton' onClick={handlePrev}>Previous</button>
          <button className='shuffleButton' onClick={shuffleData}>Shuffle</button>
          <button className='nextButton' onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Final;
