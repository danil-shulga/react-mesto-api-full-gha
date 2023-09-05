import React from "react";
import AuthorizationPage from "./AuthorizationPage/AuthorizationPage";

function Login({setLoggedInData, handleAuthorizationFormSubmit, loggedIn}) {
  return (
    <AuthorizationPage
      title="Вход"
      buttonText="Войти"
      showSingInLink={false}
      loggedIn={loggedIn}
      handleAuthorizationFormSubmit={handleAuthorizationFormSubmit}
      setLoggedInData={setLoggedInData}
    />
  );
}

export default Login;
