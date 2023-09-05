import React from "react";

function ImagePopup(props) {
  const { isOpen, onClose } = props;
  const card = props.card;
  return (
    <div
      // раньше при закрытии ImagePopup картинка сразу удалялась а попап закрывался постепенно из за этого он во время анимации был пустым
      // немного переделал логику открытия ImagePopup, добавил ему props isOpen как и в PopupWithForm
      // а содержимое попапа теперь не очищается при закрытии а заменяется новым только при открытии

      // тоже замечал что порой появляется баг с начальным отображением прошлой картинки. заметил что он появляется при изменении кода когда проект запущен
      // и лечится его перезапуском. так же на GH-page {https://danil-shulga.github.io/mesto-react/} все работает без сбоев
      className={`popup popup_card-img ${isOpen && "popup_opened"}`}
      onMouseDown={onClose}
    >
      <div
        className="popup__container popup__container_card-img"
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <img
          className="popup__img"
          src={card.link}
          alt={card.alt || card.name}
          draggable="false"
        />
        <p className="popup__img-title">{card.name}</p>
        <button
          className="popup__btn-close"
          type="reset"
          aria-label="закрыть без сохранения"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
