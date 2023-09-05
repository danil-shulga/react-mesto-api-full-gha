import React from 'react';
import PopupWithForm from './PopupWithForm';
import useFormAndValidation from '../../hooks/useFormAndValidation';

function AddPlacePopup(props) {
  const { handleAddPlaceSubmit, isAddPlacePopupOpen, closeAllPopups } = props;
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      isOpen={isAddPlacePopupOpen}
      isValid={isValid}
      resetForm={resetForm}
      onClose={closeAllPopups}
      onSubmit={(e) => handleAddPlaceSubmit(e, values)}>
      <input
        id="card-title"
        className="popup__input popup__input_card-title"
        name="cardTitle"
        type="text"
        value={values.cardTitle || ''}
        onChange={handleChange}
        placeholder="Название места"
        autoComplete="off"
        minLength={2}
        maxLength={30}
        required
      />
      <span className="popup__error">{errors.cardTitle}</span>
      <input
        id="img-url"
        className="popup__input popup__input_img-url"
        name="imgUrl"
        type="url"
        value={values.imgUrl || ''}
        onChange={handleChange}
        placeholder="Ссылка на фото"
        autoComplete="off"
        required
      />
      <span className="popup__error">{errors.imgUrl}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
