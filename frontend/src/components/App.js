import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import api from "../utils/api";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Modals from "./Modals/Modals.jsx";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import signApi from "../utils/signApi";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [InfoTooltipData, setInfoTooltipData] = useState({
    title: "",
    img: "",
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInData, setLoggedInData] = useState({});
  const [JWT, setJWT] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : "null"
  );

  function handleSignUpSubmit(e) {
    e.preventDefault();
    signApi
      .signup(loggedInData)
      .then((res) => {
        setInfoTooltipData({
          title: "Вы успешно зарегистрировались!",
          img: "acceptImg",
        });
        setIsInfoTooltipOpen(true);
      })
      .catch((res) => {
        setInfoTooltipData({
          title: `Что-то пошло не так!Попробуйте ещё раз.`,
          img: "errorImg",
        });
        setIsInfoTooltipOpen(true);
        console.error("ошибка при регистрации", res);
      });
  }

  function handleSignInSubmit(e) {
    e.preventDefault();
    signApi
      .signin(loggedInData)
      .then((res) => {
        console.log(res)
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: res.token,
          })
        );
        setJWT(JSON.parse(localStorage.getItem("user")).token);
        setLoggedIn(true);
      })
      .catch((res) => console.error("ошибка при входе", res));
  }

  useEffect(() => {
    signApi
      .checkToken(JWT)
      .then((res) => {
        setLoggedInData({ ...loggedInData, login: res.email });
        setLoggedIn(true);
      })
      .catch((res) => {
        setLoggedIn(false);
        console.error("токены не совпадают", res);
      });
  }, [JWT]);

  // получение данных текущего пользователя
  useEffect(() => {
    api
      .getUserInfo(JWT)
      .then((res) => {
        setCurrentUser(res)})
      .catch((res) => console.error("ошибка при загрузке профиля", res));
  }, [JWT]);

  // изменение аватара
  function handleAvatarSubmit(e, avatar) {
    e.preventDefault();

    api
      .patchUserAvatar( avatar, JWT )
      .then((res) => {
        closeAllPopups();
        setCurrentUser(res);
      })
      .catch((res) => console.error("ошибка при обновлении аватара", res));
  }

  // изменение данных пользователя
  function handleEditProfileSubmit(e, inputsValue) {
    e.preventDefault();

    api
      .patchUserInfo(inputsValue, JWT)
      .then((res) => {
        closeAllPopups();
        setCurrentUser(res);
      })
      .catch((res) =>
        console.error("ошибка при обновлении данных профиля", res)
      );
  }

  // получение массива карточек
  useEffect(() => {
    api
      .getCards(JWT)
      .then((res) => setCards(res.reverse()))
      .catch((res) => console.error("ошибка при загрузке карточек", res));
  }, [JWT]);

  // добавление карточки
  function handleAddPlaceSubmit(e, inputsValue) {
    e.preventDefault();

    api
      .createCard(inputsValue, JWT)
      .then((newCard) => {
        closeAllPopups();
        setCards([newCard, ...cards]);
      })
      .catch((res) => console.log("ошибка при добавлении карточки", res));
  }

  // изменение состояния лайка
  const handleCardLikeSubmit = useCallback(
    (currentCard) => {
      const isLiked = currentCard.likes.includes(currentUser._id);
      api
        .changeLikeCardStatus(currentCard._id, isLiked, JWT)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((card) => (card._id === currentCard._id ? newCard : card))
          );
        })
        .catch((res) => console.error("ошибка при изменении лайка", res));
    },
    [currentUser, JWT]
  );

  // удаление карточки
  function handleCardDeleteSubmit(e) {
    e.preventDefault();

    api
      .deleteCard(selectedCard._id, JWT)
      .then(() => {
        setCards((cards) =>
          cards.filter((card) => card._id !== selectedCard._id)
        );
        closeAllPopups();
      })
      .catch((res) => console.error("ошибка при удалении карточки", res));
  }

  const popupsProps = {
    cards,
    setCards,
    isEditAvatarPopupOpen,
    handleAvatarSubmit,
    handleAddPlaceSubmit,
    handleEditProfileSubmit,
    handleCardDeleteSubmit,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isConfirmPopupOpen,
    isImagePopupOpen,
    isInfoTooltipOpen,
    InfoTooltipData,
    closeAllPopups,
    selectedCard,
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardDeleteClick = useCallback((cardData) => {
    setSelectedCard(cardData);
    setIsConfirmPopupOpen(true);
  }, []);

  const handleCardClick = useCallback((cardData) => {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Routes>
            <Route
              path="*"
              element={
                <>
                  <Header
                    userLogin={loggedInData.login}
                    setJWT={setJWT}
                    link="/sign-in"
                    buttonText="Выйти"
                  />
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    element={Main}
                    cards={cards}
                    setCards={setCards}
                    handleCardLikeSubmit={handleCardLikeSubmit}
                    onCardDeleteClick={handleCardDeleteClick}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                  />
                </>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Header link="/sign-up" buttonText="Регистрация" />
                  <Login
                    loggedIn={loggedIn}
                    setLoggedInData={setLoggedInData}
                    handleAuthorizationFormSubmit={handleSignInSubmit}
                  />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header link="/sign-in" buttonText="Войти" />
                  <Register
                    setLoggedInData={setLoggedInData}
                    handleAuthorizationFormSubmit={handleSignUpSubmit}
                  />
                </>
              }
            />
          </Routes>
          <Footer />
          {/* подключение всех модальных окон одним компонентом */}
          <Modals {...popupsProps} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
