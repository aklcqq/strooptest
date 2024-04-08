// testItemGenerator.js
const { TestItem } = require('../models');

const colors = [
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#008000' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Purple', value: '#800080' },
    { name: 'Orange', value: '#FFA500' },
  ];
  
function generateTestItem(sessionId) {
  const isConsistent = Math.random() < 0.5;

  // Select the main color/word for the test item
  const mainIndex = Math.floor(Math.random() * colors.length);
  const mainColor = colors[mainIndex];

  let testItem = {
    sessionId,
    word: mainColor.name,
    color: mainColor.value,
    correctAnswer: mainColor.name,
    distractors: []
  };  

  if (!isConsistent) {
    let diffColor;
    do {
        diffColor = colors[Math.floor(Math.random() * colors.length)];
    } while (diffColor.name === mainColor.name);
    testItem.word = diffColor.name;
  }

    // Generate distractors
    const distractorIndexes = new Set();
    while (distractorIndexes.size < 3) { // Assuming 3 distractors needed
        const randomIndex = Math.floor(Math.random() * colors.length);
        if (randomIndex !== mainIndex) {
            distractorIndexes.add(randomIndex);
        }
    }

    testItem.distractors = Array.from(distractorIndexes).map(index => colors[index].name);

    return testItem;

}

async function createAndSaveTestItem(sessionId) {
  const testItemData = generateTestItem(sessionId);
  const testItem = new TestItem(testItemData);
  await testItem.save();
  return testItem;
}

module.exports = { createAndSaveTestItem };
