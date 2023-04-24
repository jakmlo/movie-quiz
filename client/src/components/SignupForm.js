import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../service/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleLogo from "../assets/google-icon.svg";

import "./SignupForm.css";
import ButtonProvider from "./ButtonProvider";
import InputField from "./InputField";
import Alert from "./Alert";

const SignupForm = () => {
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PASSWORD_REGEX =
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{10,24}$/;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordClicked, setMatchPasswordClicked] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmited, setIsSubmited] = useState(false);

  // Checking inputs against regex
  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    setValidPassword(result);
    if (password) {
      const match = password === matchPassword;
      setValidMatchPassword(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, matchPassword]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleMatchPassword = (e) => {
    setMatchPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    if (!EMAIL_REGEX.test(email) && !PASSWORD_REGEX.test(password)) {
      setErrorMessage(
        "Nieprawidłowy adres email i hasło. Użyj co najmniej 10 znaków w tym: mała litera, wielka litera, cyfra i znak specjalny."
      );
    } else if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Nieprawidłowy adres email.");
    } else if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage(
        "Nieprawidłowe hasło. Użyj co najmniej 10 znaków w tym: mała litera, wielka litera, cyfra i znak specjalny."
      );
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (e) {
        if (e.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMessage("Nieprawidłowy login i/lub hasło.");
        } else {
          setErrorMessage("Błąd logowania.");
        }
      }
    }
    setTimeout(() => {
      setErrorMessage("");
    }, "5000");
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
      <div className="signup-container">
        <h2 className="signup-container__title">Movie Quiz</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            value={email}
            label="Email"
            type="email"
            placeholder="Adres email"
            onChange={handleEmail}
            validInput={validEmail}
            isSubmited={isSubmited}
            inputClicked={emailClicked}
            setInputClicked={setEmailClicked}
          />
          <InputField
            value={password}
            label="Hasło"
            type="password"
            placeholder="●●●●●●●●●●"
            onChange={handlePassword}
            validInput={validPassword}
            isSubmited={isSubmited}
            inputClicked={passwordClicked}
            setInputClicked={setPasswordClicked}
          />
          <InputField
            value={matchPassword}
            label="Potwierdź hasło"
            type="password"
            placeholder="●●●●●●●●●●"
            onChange={handleMatchPassword}
            validInput={validMatchPassword}
            isSubmited={isSubmited}
            inputClicked={matchPasswordClicked}
            setInputClicked={setMatchPasswordClicked}
          />
          <button className="signup-container__btn" type="submit">
            Załóż konto
          </button>
        </form>
        <div>
          <p className="signup-container__text">
            Masz już konto?{" "}
            <Link className="signup-container__link" to="/login">
              Zaloguj się!
            </Link>
          </p>
        </div>
        <div className="signup-container__separator"></div>
        <p className="signup-container__provider-text">
          Lub zaloguj się z Google
        </p>
        <ButtonProvider
          src={GoogleLogo}
          handleClick={handleClick}
          provider={googleProvider}
          name="Google"
        />
      </div>
    </>
  );
};

export default SignupForm;
