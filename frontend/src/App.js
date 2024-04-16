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

  const totalRounds = 4; // Example: Complete 3 rounds with 3 different songs
  // const [currentSong, setCurrentSong] = useState('Song1.mp3'); // Start with the first song

  const [currentRound, setCurrentRound] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [testItems, setTestItems] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [sessionId, setSessionId] = useState('');

  const [testCompleted, setTestCompleted] = useState(false);
  // const [testScore, setTestScore] = useState(0); // Assume score is calculated somehow
  const [sessionSummary, setSessionSummary] = useState(null);
  const [currentSong, setCurrentSong] = useState('silent'); // Start with the first song
  const songs = ['silent', 'jazz', 'classical', 'rock', 'pop']; 

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

  const handleAnswerSelected = async (selectedAnswer) => {
    // Always submit the response for the current test item and selected answer
    try {
      await submitResponse({
        variables: {
          sessionId: sessionId,
          testItemId: testItems[currentItemIndex].id,
          selectedAnswer: selectedAnswer,
          musicGenre: currentSong,
        },
      });
  
      // Check if there are more items in the current round
      if (currentItemIndex < testItems.length - 1) {
        // Move to the next test item within the current round
        setCurrentItemIndex(currentItemIndex + 1);
      } else if (currentRound < totalRounds) {
        // If the current round is completed and there are more rounds left
        // Prepare for the next round
        setCurrentItemIndex(0); // Reset item index for the next round
        setCurrentRound(currentRound + 1); // Move to the next round
        setCurrentSong(songs[currentRound]); // Update the song for the new round
  
        // Optionally regenerate or reshuffle test items for the new round
        // This step depends on whether you want fresh items each round or the same items in a different order
        // For simplicity, we'll assume you're reusing the same test items
        // If you need to fetch new items or modify them, include that logic here
  
      } else {
        // All rounds and items are completed
        setTestCompleted(true);
        setSessionStarted(false);
  
        // Finalize the session now that testing is complete
        // This can include any cleanup or final data submission
        await finalizeSession({ variables: { sessionId } });
      }
    } catch (error) {
      console.error("Error submitting response:", error);
      // Handle errors (e.g., show an error message)
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
          <>
          <MusicPlayer song={currentSong} autoPlay={true} loop={true} />
          <TestItemComponent
            testItem={testItems[currentItemIndex]}
            onAnswerSelected={handleAnswerSelected}
          />
          
          </>
        )}
        {testCompleted && (
          <ResultPage sessionSummary={sessionSummary}/>
        )}
      </header>
    </div>
  );
  
}

export default App;
