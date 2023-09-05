import React from "react";
import logo from "../images/icon/logo_wight.svg";
import { Link } from "react-router-dom";

function Header({ link, userLogin, buttonText, setJWT }) {
  return (
    <header className="header">
      <img
        className="logo header__logo"
        src={logo}
        alt="лого сайта"
        draggable="false"
      />
      <span className="header__user">{userLogin}</span>
      <Link
        className="header__link"
        onClick={() => {
          if (setJWT) {
            setJWT(null)
            localStorage.removeItem('user');
          }
        }}
        to={link}
      >
        {buttonText}
      </Link>
    </header>
  );
}

export default Header;
