export default function Card({ card, handleCardClick }) {
  return (
    <div onClick={() => handleCardClick(card.id)}>
      <p>{card.name}</p>
    </div>
  );
}
