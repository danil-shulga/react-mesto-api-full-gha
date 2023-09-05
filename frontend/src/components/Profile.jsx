import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="page__profile profile">
      <div className="profile__user user">
        <div className="user__avatar-block" onClick={props.onEditAvatar}>
          <img
            className="user__avatar-img"
            src={currentUser.avatar}
            alt="фото профиля"
            draggable="false"
          />
          <div className="user__avatar-overlay" />
        </div>
        <div className="user__info">
          <div className="user__name-and-btn-wrapper">
            <h1 className="user__name">{currentUser.name}</h1>
            <button
              className="user__btn-edit"
              type="button"
              aria-label="редактировать профиль"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="user__description">{currentUser.about}</p>
        </div>
      </div>
      <button
        className="profile__btn-add-card"
        type="button"
        aria-label="добавить место"
        onClick={props.onAddPlace}
      />
    </section>
  );
}

export default Profile;
