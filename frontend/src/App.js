import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import './App.css';
import ColorWordDisplay from './components/ColorWordDisplay';
import TestItemComponent from './components/TestItemComponent'; // Ensure this component
import { START_SESSION_MUTATION, GENERATE_TEST_ITEMS_MUTATION, SUBMIT_RESPONSE_MUTATION, FINALIZE_SESSION  } from './operations';
import { v4 as uuidv4 } from 'uuid';
import ResultPage from './components/ResultPage';
import MusicPlayer from './components/MusicPlayer';

function App() {

  const [selectedOption, setSelectedOption] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [testItems, setTestItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [sessionId, setSessionId] = useState('');

  const [testCompleted, setTestCompleted] = useState(false);
  // const [testScore, setTestScore] = useState(0); // Assume score is calculated somehow
  const [sessionSummary, setSessionSummary] = useState(null);

  // Hooks are always called at the top level
  const [startSession] = useMutation(START_SESSION_MUTATION);
  const [generateTestItems] = useMutation(GENERATE_TEST_ITEMS_MUTATION);
  const [submitResponse] = useMutation(SUBMIT_RESPONSE_MUTATION); 
  const [finalizeSession] = useMutation(FINALIZE_SESSION, {
    onCompleted: (data) => {
      // This callback ensures you can handle the session summary once it's available
      console.log("Session finalized and summary fetched:", data);
      setSessionSummary(data.finalizeSession);
    }
  });

  const handleStartClick = () => {
    const generatedSessionId = uuidv4();
    setSessionId(generatedSessionId); // Set sessionId state
    startSession({ variables: { sessionId: generatedSessionId } })
      .then(({ data }) => {
        generateTestItems({ variables: { sessionId: data.startSession.sessionId } })
          .then(({ data }) => {
            setTestItems(data.generateTestItems);
            setSessionStarted(true);
          });
      });
  };

  const handleAnswerSelected = (selectedAnswer) => {
    console.log(selectedAnswer);
    if (currentItemIndex < testItems.length) {
      submitResponse({
        variables: {
          sessionId: sessionId,
          testItemId: testItems[currentItemIndex].id,
          selectedAnswer: selectedAnswer,
        },
      }).then(() => {
        // Logic after submitting an answer, e.g., move to the next question
        if (currentItemIndex < testItems.length - 1) {
          setCurrentItemIndex(currentItemIndex + 1);
        } else {
          // Test concluded
          setTestCompleted(true);
          setSessionStarted(false);
          finalizeSession({ variables: { sessionId } });
          // Show results or reset test
        }
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {!sessionStarted && !testCompleted && (
          <>
            <ColorWordDisplay />
            <p>Instruction: select the color of the word, not the word text itself.</p>
            <button onClick={handleStartClick} className="App-link">Start</button>
          </>
        )}
        {sessionStarted && (
          <TestItemComponent
            testItem={testItems[currentItemIndex]}
            onAnswerSelected={handleAnswerSelected}
          />
        )}
        {testCompleted && (
          <ResultPage sessionSummary={sessionSummary}/>
        )}
      </header>
    </div>
  );
  
}

export default App;
