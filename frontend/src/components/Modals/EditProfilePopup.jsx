import React, { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function EditProfilePopup(props) {
  const { handleEditProfileSubmit, isEditProfilePopupOpen, closeAllPopups } = props;
  const  currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    setValues({
      name: currentUser.name || " ",
      about: currentUser.about || " ",
    });
  }, [currentUser, isEditProfilePopupOpen]);

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isValid={isValid}
      resetForm={resetForm}
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onSubmit={(e) => handleEditProfileSubmit(e, values)}
    >
      <input
        id="user-name"
        type="text"
        name="name"
        value={values.name || ''}
        className="popup__input popup__input_text_user-name"
        placeholder="Имя"
        autoComplete="off"
        required
        minLength={2}
        maxLength={40}
        onChange={handleChange}
      />
      <span className="popup__error">{errors.name}</span>
      <input
        id="user-description"
        type="text"
        name="about"
        value={values.about || ''}
        className="popup__input popup__input_text_user-description"
        placeholder="О себе"
        autoComplete="off"
        required
        minLength={4}
        maxLength={200}
        onChange={handleChange}
      />
      <span className="popup__error">{errors.about}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
