import React, { useState, useEffect } from 'react';

const ColorWordDisplay = () => {
  const colors = [
    { word: 'Red', color: 'red' },
    { word: 'Blue', color: 'blue' },
    { word: 'Green', color: 'green' },
    { word: 'Yellow', color: 'yellow' },
    { word: 'Purple', color: 'purple' },
    { word: 'Orange', color: 'orange' },
    { word: 'Pink', color: 'pink' },
    { word: 'Grey', color: 'grey' },
  ];

  const [currentDisplay, setCurrentDisplay] = useState({ word: '', color: '' });

  useEffect(() => {
    const changeWordAndColor = () => {
      const wordIndex = Math.floor(Math.random() * colors.length);
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      const isConsistent = Math.random() > 0.5;

      const newWord = colors[wordIndex].word;
      const newColor = isConsistent ? colors[wordIndex].color : colors[colorIndex].color;

      setCurrentDisplay({ word: newWord, color: newColor });
    };

    const intervalId = setInterval(changeWordAndColor, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1 style={{ color: currentDisplay.color, fontSize: '48px' }}>{currentDisplay.word}</h1>
    </div>
  );
};

export default ColorWordDisplay;
