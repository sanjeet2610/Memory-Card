import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";
import ScoreBoard from "./scoreBoard";
import "./App.css";

function App() {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clickedCardIds, setClickedCardsIds] = useState([]);

  function shuffleCards(cards) {
    const array = [...cards];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    async function fetchingPokemon() {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20",
      );
      const data = await response.json();
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const pokeData = await res.json();
          return pokeData;
        }),
      );
      const formattedCards = detailedData.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        };
      });
      setCards(shuffleCards(formattedCards));
    }
    fetchingPokemon();
  }, []);

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

  return (
    <div className="memory-game">
      <ScoreBoard currScore={currScore} bestScore={bestScore}></ScoreBoard>
      <div className="cardlist">
        {cards.map((card) => (
          <Card key={card.id} card={card} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
