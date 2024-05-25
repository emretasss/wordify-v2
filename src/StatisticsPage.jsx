import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StatisticsPage.css';

const StatisticsPage = () => {
    const location = useLocation();
    const [learnedWords, setLearnedWords] = useState([]);
    const [unlearnedWords, setUnlearnedWords] = useState([]);

    useEffect(() => {
        if (location.state && location.state.learnedWords && location.state.unlearnedWords) {
            setLearnedWords(location.state.learnedWords);
            setUnlearnedWords(location.state.unlearnedWords);
        }
    }, [location.state]);

    return (
        <div className="backgroundStatistics">
            <div className="containerStatistics">
                <h1 className="titleStatistics">İstatistikler</h1>
                <h2 className="learnedWordsTitle">Öğrenilen Kelimeler</h2>
                <ul className="listStatistics">
                    {learnedWords.map((word, index) => (
                        <li key={index} className="listItemStatistics">{word}</li>
                    ))}
                </ul>
                <h2 className="unlearnedWordsTitle">Öğrenilmemiş Kelimeler</h2>
                <ul className="listStatistics">
                    {unlearnedWords.map((word, index) => (
                        <li key={index} className="listItemStatistics">{word}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StatisticsPage;
