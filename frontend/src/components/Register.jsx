import React from "react";
import AuthorizationPage from "./AuthorizationPage/AuthorizationPage";

function Register({setLoggedInData, handleAuthorizationFormSubmit}) {
  return (
    <AuthorizationPage
      title="Регистрация"
      buttonText="Зарегистрироваться"
      showSingInLink={true}
      handleAuthorizationFormSubmit={handleAuthorizationFormSubmit}
      setLoggedInData={setLoggedInData}
    />
  );
}

export default Register;
