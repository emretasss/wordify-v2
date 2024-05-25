import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './test.css';

const Test = () => {
    const [inputData, setInputData] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState("");
    const [randomQuestionAnswer, setRandomQuestionAnswer] = useState("");
    const [questionNumber, setQuestionNumber] = useState(1);
    const [correctQuestions, setCorrectQuestions] = useState(0);
    const [wrongQuestions, setWrongQuestions] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [rightQuestionPos, setRightQuestionPos] = useState(0);
    const [buttonStyles, setButtonStyles] = useState({});
    const [totalQuestions, setTotalQuestions] = useState(10);
    const [correctlyAnsweredWords, setCorrectlyAnsweredWords] = useState([]);
    const [incorrectlyAnsweredWords, setIncorrectlyAnsweredWords] = useState([]);
    const [askedQuestions, setAskedQuestions] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.inputData) {
            setInputData(location.state.inputData);
        }
    }, [location.state]);

    useEffect(() => {
        if (inputData.length > 0 && questionNumber <= totalQuestions) {
            generateRandomQuestion();
        }
    }, [inputData, questionNumber]);

    useEffect(() => {
        if (questionNumber > totalQuestions) {
            navigateResult();
        }
    }, [questionNumber]);

    const generateRandomQuestion = () => {
        let arrayLength = inputData.length;
        let randomQuestionIndex;
        
        // Yeni bir soru indisi seçin
        do {
            randomQuestionIndex = getRandomIntInclusive(0, arrayLength - 1);
        } while (askedQuestions.includes(randomQuestionIndex));

        // Yeni soruyu ve cevabını ayarlayın
        setRandomQuestion(inputData[randomQuestionIndex].questions);
        setRandomQuestionAnswer(inputData[randomQuestionIndex].answers);
        setAskedQuestions(prev => [...prev, randomQuestionIndex]);
        
        // Doğru cevabın pozisyonunu rastgele seçin
        const correctPos = getRandomIntInclusive(1, 4);
        setRightQuestionPos(correctPos);

        // Cevapları oluşturun
        let newAnswers = new Array(4).fill("");
        newAnswers[correctPos - 1] = inputData[randomQuestionIndex].answers;

        for (let i = 0; i < 4; i++) {
            if (i !== (correctPos - 1)) {
                let position;
                do {
                    position = getRandomIntInclusive(0, arrayLength - 1);
                } while (position === randomQuestionIndex);
                newAnswers[i] = inputData[position].answers;
            }
        }

        setAnswer(newAnswers);
        setButtonStyles({});
    };

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function validateAnswer(number) {
        const isCorrect = number === rightQuestionPos;
        setButtonStyles({
            ...buttonStyles,
            [rightQuestionPos]: 'green',
            [number]: isCorrect ? 'green' : 'red'
        });

        if (isCorrect) {
            setCorrectQuestions(prev => prev + 1);
            setCorrectlyAnsweredWords(prev => [...prev, { questions: randomQuestion, answers: randomQuestionAnswer }]);
        } else {
            setWrongQuestions(prev => prev + 1);
            setIncorrectlyAnsweredWords(prev => [...prev, { questions: randomQuestion, answers: randomQuestionAnswer }]);
        }

        setTimeout(() => {
            setQuestionNumber(prev => prev + 1);
        }, 1000);
    }

    const navigateResult = () => {
        navigate('/testresult', { state: { correctQuestions, wrongQuestions, correctlyAnsweredWords, incorrectlyAnsweredWords } });
    }

    const handleQuestionNumberChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setTotalQuestions(value);
        }
    };

    return (
        <div className='backgroundTest'>
            <div id="saveBox" className='simpleBox'>
                <p>Items saved!</p>
            </div>
            <div className='containerTest'>
                <div className='quiz-card'>
                    <div className='questionArea'>
                        <p className='questionNumber'>{questionNumber}/{totalQuestions}</p>
                        <p className='correctQuestion'>{correctQuestions}</p>
                        <p className='wrongQuestion'>{wrongQuestions}</p>
                        <h1 className='h1Question'>{randomQuestion}</h1>
                    </div>
                    <div className='answersArea'>
                        {[1, 2, 3, 4].map((index) => (
                            <button
                                key={index}
                                className='buttonAnswer'
                                onClick={() => validateAnswer(index)}
                                style={{ backgroundColor: buttonStyles[index] }}
                                disabled={buttonStyles[index]}
                            >
                                {answer[index - 1] || "Loading..."}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="questionNumberInputContainer">
                    <label htmlFor="questionNumberInput">Number of Questions:</label>
                    <input
                        id="questionNumberInput"
                        type="number"
                        min="1"
                        value={totalQuestions}
                        onChange={handleQuestionNumberChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Test;
