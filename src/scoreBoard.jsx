import "./scoreboard.css";

export default function Scoreboard({ currScore, bestScore }) {
  return (
    <div className="scoreboard">
      <p>Current Score :{currScore}</p>
      <p>Best Score :{bestScore}</p>
    </div>
  );
}
