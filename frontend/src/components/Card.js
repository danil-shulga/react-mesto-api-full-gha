import React, { memo, useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default memo(function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card.owner === currentUser._id;
  const isLiked = card.likes.includes(currentUser._id);

  return (
    <li className="cards__card card">
      <img
        className="card__img"
        src={card.link}
        alt={card.alt || card.name}
        draggable="false"
        onClick={() => onCardClick(card)}
      />
      {isOwner && (
        <button
          className="card__delete"
          onClick={() => {
            onCardDelete(card);
          }}
        />
      )}
      <div className="card__footer">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-block">
          <button
            onClick={() => onCardLike(card)}
            className={`card__btn ${isLiked && 'card__btn_activated'}`}
            type="button"
            aria-label="отметить как 'нравится'"
          />
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
});

// export default Card;
