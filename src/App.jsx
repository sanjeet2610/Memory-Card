import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import ScoreBoard from "./scoreBoard";

function App() {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clickedCardIds, setClickedCardsIds] = useState([]);
  useEffect(() => {
    const tempCards = [
      { id: 1, name: "Apple", image: "img1" },
      { id: 2, name: "Banana", image: "img2" },
    ];
    setCards(tempCards);
  }, []);
  console.log(cards);

  function handleCardClick(id) {
    if (clickedCardIds.includes(id)) {
      if (bestScore < currScore) {
        setBestScore(currScore);
      }
      setCurrScore(0);
      setClickedCardsIds([]);
    } else {
      const newScore = currScore + 1;
      if (bestScore < newScore) {
        setBestScore(newScore);
      }
      setClickedCardsIds((prev) => [...prev, id]);
      setCurrScore((prev) => prev + 1);
    }
    setCards((prev) => shuffleCards(prev));
  }

  function shuffleCards(cards) {
    const array = [...cards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return (
    <div>
      <ScoreBoard currScore={currScore} bestScore={bestScore}></ScoreBoard>
      {cards.map((card) => (
        <Card key={card.id} card={card} handleCardClick={handleCardClick} />
      ))}
    </div>
  );
}

export default App;
