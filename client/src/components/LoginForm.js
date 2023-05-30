import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../service/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import GoogleLogo from "../assets/google-icon.svg";

import "./LoginForm.scss";
import ButtonProvider from "./ButtonProvider";
import InputField from "./InputField";
import Alert from "./Alert";

const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (
        e.message === "Firebase: Error (auth/invalid-email)." ||
        e.message === "Firebase: Error (auth/wrong-password)."
      ) {
        setErrorMessage("Nieprawidłowy login i/lub hasło.");
      } else {
        setErrorMessage("Błąd logowania.");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, "3000");
    }
  };

  const handleClick = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (e) {
      if (e.message === "Firebase: Error (auth/popup-closed-by-user).") {
        setErrorMessage(
          "Okienko logowania zostało zamknięte przez użytkownika."
        );
      } else {
        setErrorMessage("Błąd logowania.");
      }
      setTimeout(() => {
        setErrorMessage("");
      }, "3000");
    }
  };

  return (
    <>
      {errorMessage ? <Alert error={errorMessage} /> : <></>}
      <div className="login-container">
        <h2 className="login-container__title">Movie Quiz</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmail}
          />
          <InputField
            label="Hasło"
            type="password"
            value={password}
            onChange={handlePassword}
          />
          <button className="login-container__btn" type="submit">
            Zaloguj
          </button>
        </form>
        <div>
          <p className="login-container__text">
            Nie masz jeszcze konta?{" "}
            <Link className="login-container__link" to="/signup">
              Zarejestruj się!
            </Link>
          </p>
        </div>
        <div className="login-container__separator"></div>
        <div>
          <p className="login-container__provider-text">
            Lub zaloguj się z Google
          </p>
          <ButtonProvider
            src={GoogleLogo}
            handleClick={handleClick}
            provider={googleProvider}
            name="Google"
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
