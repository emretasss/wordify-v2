import React, { useState } from "react";
import './lineComp.css';

const LineComp = ({ id, initialQuestion = '', initialAnswer = '', initialImage = '', initialSentence = '', onInputComplete, index, deleteLine }) => {
  const [questions, setQuestion] = useState(initialQuestion);
  const [answers, setAnswer] = useState(initialAnswer);
  const [image, setImage] = useState(initialImage);
  const [sentence, setSentence] = useState(initialSentence);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    onInputComplete({ _id: id, questions: e.target.value, answers, image, sentence });
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
    onInputComplete({ _id: id, questions, answers: e.target.value, image, sentence });
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
    onInputComplete({ _id: id, questions, answers, image: e.target.value, sentence });
  };

  const handleSentenceChange = (e) => {
    setSentence(e.target.value);
    onInputComplete({ _id: id, questions, answers, image, sentence: e.target.value });
  };

  const handleDelete = () => {
    deleteLine();
  };

  return (
    <div className="lineComp">
      <span>{index + 1} :</span>
      <span>Question:</span>
      <input
        type="text"
        value={questions}
        onChange={handleQuestionChange}
        required
      />
      <span>Answer: </span>
      <input
        type="text"
        value={answers}
        onChange={handleAnswerChange}
        required
      />
      <span>Image URL: </span>
      <input
        type="text"
        value={image}
        onChange={handleImageChange}
        required
      />
      <span>Sentence: </span>
      <input
        type="text"
        value={sentence}
        onChange={handleSentenceChange}
        required
      />
      <button className='buttonDelete' onClick={handleDelete}>DELETE</button>
    </div>
  );
};

export default LineComp;
