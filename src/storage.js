// storage.js

export const getWordsFromStorage = () => {
    const words = localStorage.getItem('words');
    return words ? JSON.parse(words) : [];
};

export const saveWordsToStorage = (words) => {
    localStorage.setItem('words', JSON.stringify(words));
};

export const updateWordInStorage = (updatedWord) => {
    const words = getWordsFromStorage();
    const updatedWords = words.map(word =>
        word._id === updatedWord._id ? updatedWord : word
    );
    saveWordsToStorage(updatedWords);
};

