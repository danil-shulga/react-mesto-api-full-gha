import React, {memo} from "react";
import Card from "./Card";

export default memo(function Cards(props) {
  const { cards, onCardClick, handleCardLikeSubmit, onCardDeleteClick } = props;

  function renderCards() {
    return cards.map((card) => (
      <Card
        card={card}
        key={card._id}
        onCardClick={onCardClick}
        onCardLike={handleCardLikeSubmit}
        onCardDelete={onCardDeleteClick}
      />
    ));
  }

  return (
    <section className="page__cards cards" aria-label="фото с разных мест">
      <ul className="cards__list">{renderCards()}</ul>
    </section>
  );
})

// export default Cards;
