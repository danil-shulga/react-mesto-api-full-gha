import React from "react";

function PopupWithForm(props) {
  const {
    name,
    title,
    buttonText,
    isOpen,
    onClose,
    onSubmit,
    children,
    isValid,
    resetForm
  } = props;

  return (
    <div
      className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      onMouseDown={(e) => {
        onClose(e)
        resetForm()
      }}
    >
      <div
        className="popup__container"
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <form
          className="popup__form"
          name={`${name}`}
          action="/"
          method="post"
          noValidate=""
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className={`popup__btn-save ${
              isValid || "popup__btn-save_disabled"
            }`}
            type="submit"
            disabled={!isValid}
          >
            {buttonText || "Сохранить"}
          </button>
        </form>
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

export default PopupWithForm;
