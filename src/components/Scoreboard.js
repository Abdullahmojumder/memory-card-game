function Scoreboard({ currentScore, bestScore }) {
  return (
    <div className="flex space-x-8 mb-6">
      <div className="text-xl font-semibold">
        Current Score: <span className="text-blue-600">{currentScore}</span>
      </div>
      <div className="text-xl font-semibold">
        Best Score: <span className="text-green-600">{bestScore}</span>
      </div>
    </div>
  );
}

export default Scoreboard;