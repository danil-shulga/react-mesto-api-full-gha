import React from "react";
import PopupWithForm from "./PopupWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function EditAvatarPopup(props) {
  const { handleAvatarSubmit, isEditAvatarPopupOpen, closeAllPopups } = props;
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      isOpen={isEditAvatarPopupOpen}
      resetForm={resetForm}
      isValid={isValid}
      onClose={closeAllPopups}
      onSubmit={(e) => handleAvatarSubmit(e, values.avatar)}
    >
      <input
        value={values.avatar || ''}
        onChange={handleChange}
        type="url"
        name="avatar"
        className="popup__input popup__input_avatar-url"
        id="user-avatar"
        placeholder="Ссылка на фото"
        autoComplete="off"
        minLength={4}
        maxLength={200}
        required
      />
      <span className="popup__error">{errors.avatar}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
