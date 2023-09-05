import React from "react";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmPopup from "./ConfirmPopup";
import InfoTooltip from "./InfoTooltip";

function Modals(props) {
  const {
    cards,
    setCards,
    handleAvatarSubmit,
    handleAddPlaceSubmit,
    handleEditProfileSubmit,
    handleCardDeleteSubmit,
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    isImagePopupOpen,
    isInfoTooltipOpen,
    InfoTooltipData,
    closeAllPopups,
    selectedCard,
  } = props;

  return (
    <>
      <EditAvatarPopup
        handleAvatarSubmit={handleAvatarSubmit}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        closeAllPopups={closeAllPopups}
      />

      <EditProfilePopup
        handleEditProfileSubmit={handleEditProfileSubmit}
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        closeAllPopups={closeAllPopups}
      />

      <AddPlacePopup
        cards={cards}
        setCards={setCards}
        handleAddPlaceSubmit={handleAddPlaceSubmit}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        closeAllPopups={closeAllPopups}
      />

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      <ConfirmPopup
        handleCardDeleteSubmit={handleCardDeleteSubmit}
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
      />

      <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} InfoTooltipData={InfoTooltipData} />
    </>
  );
}

export default Modals;
