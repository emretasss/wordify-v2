import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './testresult.css';

const TestResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [wrongAnswer, setWrongAnswer] = useState(0);
    const [correctlyAnsweredWords, setCorrectlyAnsweredWords] = useState([]);
    const [incorrectlyAnsweredWords, setIncorrectlyAnsweredWords] = useState([]);

    useEffect(() => {
        if (location.state) {
            setCorrectAnswer(location.state.correctQuestions);
            setWrongAnswer(location.state.wrongQuestions);
            setCorrectlyAnsweredWords(location.state.correctlyAnsweredWords);
            setIncorrectlyAnsweredWords(location.state.incorrectlyAnsweredWords);
        }
    }, [location.state]);

    const goBack = () => {
        navigate('/main');
    };

    const handlePrint = () => {
        window.print(); // Tarayıcı üzerinden sayfayı yazdır
    };

    const goToStatistics = () => {
        navigate('/statistics', {
            state: {
                correctlyAnsweredWords: correctlyAnsweredWords,
                incorrectlyAnsweredWords: incorrectlyAnsweredWords
            }
        });
    };

    return (
        <div className='backgroundResult'>
            <div className='containerResult'>
                <h1 className='titluResult'>Test Results</h1>
                <div className='answerBox'>
                    <p className='correctAnswer'>Correct answers: {correctAnswer}</p>
                    <p className='wrongAnswer'>Wrong answers: {wrongAnswer}</p>
                </div>
                <h1 className='percentResult'>That's {(correctAnswer / (correctAnswer + wrongAnswer)) * 100}%</h1>
                <div>
                    <h2>Correctly Answered Words</h2>
                    <ul>
                        {correctlyAnsweredWords.map((word, index) => (
                            <li key={index}>
                                {word.questions} - {word.answers}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2>Incorrectly Answered Words</h2>
                    <ul>
                        {incorrectlyAnsweredWords.map((word, index) => (
                            <li key={index}>
                                {word.questions} - {word.answers}
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={goBack} className='buttonBack'>Go back</button>
                <button onClick={handlePrint} className='buttonPrint'>Print</button>
            </div>
        </div>
    );
};

export default TestResult;
