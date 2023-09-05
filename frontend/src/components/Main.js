import React from "react";
import Cards from "./Cards";
import Profile from "./Profile";

function Main(props) {
  const {
    cards,
    onCardClick,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    handleCardLikeSubmit,
    onCardDeleteClick,
  } = props;

  return (
    <main className="main">
      <Profile
        onEditAvatar={onEditAvatar}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
      />
      <Cards
        cards={cards}
        onCardClick={onCardClick}
        handleCardLikeSubmit={handleCardLikeSubmit}
        onCardDeleteClick={onCardDeleteClick}
      />
    </main>
  );
}

export default Main;
