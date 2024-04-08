
const ResultPage = ({ sessionSummary }) => {
if (!sessionSummary) {
    return <div>Loading session summary...</div>;
    }
    
  return (
    <div>
      <h2>Session Summary</h2>
      <p>Score: {sessionSummary.score}</p>
      <p>Total Time: {sessionSummary.totalTime} seconds</p>
      {/* Display other session summary details as needed */}
    </div>
  );
};

export default ResultPage;
