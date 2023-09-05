import React from "react";
import acceptImg from '../../images/icon/Union.svg'
import errorImg from '../../images/icon/UnionErr.svg'

function InfoTooltip({name, isOpen, onClose, InfoTooltipData}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      onMouseDown={onClose}
    >
      <div
        className="popup__container"
        onMouseDown={(evt) => evt.stopPropagation()}
      >
        <img className="popup__register-img" src={{acceptImg, errorImg}[InfoTooltipData.img]} alt="register" />
        <h2 className="popup__register-title">{InfoTooltipData.title}</h2>
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

export default InfoTooltip;
