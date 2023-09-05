import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, handleCardDeleteSubmit, onClose }) {
  return (
    <PopupWithForm
      isOpen={isOpen}
      isValid={true}
      onClose={onClose}
      onSubmit={handleCardDeleteSubmit}
      name="confirm"
      title="Вы уверенны ?"
      buttonText="Удалить"
    />
  );
}

export default ConfirmPopup;
