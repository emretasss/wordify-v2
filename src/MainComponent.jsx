import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import downArrow from './downarrow.svg';
import LineComp from './LineComp';
import './MainComponent.css';
import loadingAnimation from './Rolling-1s-200px.svg';

const MainComponent = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const role = JSON.parse(localStorage.getItem('role'));
  const [questionSetTitle, setQuestionSetTitle] = useState('');
  const location = useLocation();

  const addLine = () => {
    setInputData((prevData) => [...prevData, { _id: Date.now().toString(), questions: '', answers: '', image: '', sentence: '' }]);
  };

  const handleInputComplete = (id, newData) => {
    setInputData((prevData) => prevData.map(item => item._id === id ? newData : item));
  };

  const deleteLine = (id) => {
    setInputData((prevData) => prevData.filter(item => item._id !== id));
  };

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem('myState'));
    if (savedState) {
      setInputData(savedState.allQuestionSets || []);
      setQuestionSetTitle(savedState.title || '');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > document.body.scrollHeight - 2000) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const saveItems = () => {
    const savedState = { allQuestionSets: inputData, title: questionSetTitle };
    localStorage.setItem('myState', JSON.stringify(savedState));
    triggerAnimation();
  };

  const triggerAnimation = () => {
    const saveBox = document.getElementById('saveBox');
    if (saveBox) {
      saveBox.classList.remove('simpleBox');
      void saveBox.offsetWidth; // Trigger reflow to restart animation
      saveBox.classList.add('simpleBox');
    } else {
      console.error("saveBox doesn't exist.");
    }
  };

  const navigateToFinal = () => {
    saveItems();
    navigate('/final', { state: { inputData } });
  };

  const navigateTest = () => {
    saveItems();
    navigate('/test', { state: { inputData } });
  };

  const adminDash = () => {
    navigate('/admin');
  };

  const signOut = () => {
    navigate('/');
  };

  const goDown = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className='background'>
      <div id="saveBox" className='simpleBox'>
        <p>Items saved!</p>
      </div>
      {showButton && <div className='buttonGoDown' onClick={goDown}><img className='arrowImg' src={downArrow} alt="Go Down" /></div>}
      <div className='container-main'>
        <h1 className='titleMain'>{questionSetTitle}</h1>
        {loading ? <img src={loadingAnimation} alt='loading' /> : inputData.map((data, index) => (
          <div key={data._id} className="line-container">
            <LineComp
              key={data._id}
              id={data._id}
              index={index}
              initialQuestion={data.questions}
              initialAnswer={data.answers}
              initialImage={data.image}
              initialSentence={data.sentence}
              onInputComplete={(newData) => handleInputComplete(data._id, newData)}
              deleteLine={() => deleteLine(data._id)}
            />
          </div>
        ))}
        {!loading && <button className='activate buttonAdd' onClick={addLine}>Add</button>}
        {!loading && <button className='activate buttonRemove' onClick={saveItems}>Save</button>}
        {!loading && <button className='activate buttonRemove' onClick={signOut}>Sign Out</button>}
        {inputData.length > 0 && <button className='activate buttonFinish' onClick={navigateToFinal}>Flashcard</button>}
        {!loading && <button className='activate buttonRemove' onClick={navigateTest}>Quiz</button>}
      </div>
    </div>
  );
};

export default MainComponent;