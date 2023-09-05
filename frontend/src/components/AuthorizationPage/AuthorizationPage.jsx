import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

// хотел попрактиковаться с модульными стилями и по этому решил в этой работе реализовать тх таким образом
import styles from "./AuthorizationPage.module.css";
import useFormAndValidation from "../../hooks/useFormAndValidation";

function AuthorizationForm(props) {
  const {
    title,
    buttonText,
    setLoggedInData,
    handleAuthorizationFormSubmit,
    showSingInLink,
    loggedIn,
  } = props;

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    setLoggedInData(values);
  }, [values, setLoggedInData]);

  return (
    <>
      {loggedIn && <Navigate to="/" />}
      <section className={styles.page}>
        <h2 className={styles.title}>{title}</h2>
        <form className={styles.form}>
          <input
            className={styles.input}
            value={values.email || ""}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Email"
            required
            minLength={6}
          />
          <span className="popup__error">{errors.email}</span>
          <input
            className={styles.input}
            value={values.password || ""}
            onChange={handleChange}
            name="password"
            type="password"
            placeholder="Пароль"
            required
            minLength={4}
          />
          <span className="popup__error">{errors.password}</span>
          <button
            className={styles.button}
            type="submit"
            onClick={(e) => {
              handleAuthorizationFormSubmit(e);
              resetForm();
            }}
            disabled={!isValid}
          >
            {buttonText}
          </button>
          {showSingInLink && (
            <Link className={styles.link} to="/sign-in">
              Уже зарегистрированы? Войти
            </Link>
          )}
        </form>
      </section>
    </>
  );
}

export default AuthorizationForm;
