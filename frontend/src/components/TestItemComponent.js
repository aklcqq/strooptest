import React from 'react';
import './TestItemComponent.css'; // We'll define styles here
import { useMutation } from '@apollo/client';
import { SUBMIT_RESPONSE_MUTATION } from '../operations';

const TestItemComponent = ({ testItem, onAnswerSelected }) => {

  const [submitResponse, { data, loading, error }] = useMutation(SUBMIT_RESPONSE_MUTATION);

  // Function to handle option click
  // Correctly mark the function as async to use await
  const handleOptionClick = (selectedAnswer) => {
    console.log("Submitting response with:", { sessionId: testItem.sessionId, testItemId: testItem.id, selectedAnswer: selectedAnswer });
    try {
    //   await submitResponse({
    //     variables: {
    //       sessionId: testItem.sessionId,
    //       testItemId: testItem.id,
    //       selectedAnswer: selectedAnswer,
    //     },
    //   });
      // Assuming onAnswerSelected does not need to wait for any async operations
      onAnswerSelected(selectedAnswer); 
    } catch (err) {
      // Error handling here is correct; the error will be logged to the console
      console.error("Error submitting response:", err);
    }

    if (error) {
        console.error("GraphQL Error");
    }
  };


  const { word, color, distractors, correctAnswer } = testItem;

  // Mix distractors and the correct answer for display
  const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

  if (loading) return <p>Submitting answer...</p>;
  if (error) return <p>Error submitting answer.</p>;
  
  return (
    <div>
    <div className="test-item">
      <div className="word" style={{ color: testItem.color }}>
        {testItem.word}
      </div>
      <div className="options">
        {[testItem.correctAnswer, ...testItem.distractors].sort(() => 0.5 - Math.random()).map((option, index) => (
          <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TestItemComponent;
