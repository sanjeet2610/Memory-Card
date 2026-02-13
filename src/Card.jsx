import "./card.css";

export default function Card({ card, handleCardClick }) {
  return (
    <div className="card" onClick={() => handleCardClick(card.id)}>
      <img src={card.image} alt={card.name} />
      <p>{card.name}</p>
    </div>
  );
}
