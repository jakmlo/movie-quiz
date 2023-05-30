import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../service/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleLogo from "../assets/google-icon.svg";

import "./SignupForm.scss";
import ButtonProvider from "./ButtonProvider";
import InputField from "./InputField";
import Alert from "./Alert";
import { useAuth } from "../hooks/useAuth";

const SignupForm = () => {
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const USERNAME_REGEX = /^[A-Za-z][A-Za-z0-9_]{4,20}$/;
  const PASSWORD_REGEX =
    /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{10,24}$/;

  const navigate = useNavigate();

  const { setGlobalUsername } = useAuth();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameClicked, setUsernameClicked] = useState(false);

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
    const result = USERNAME_REGEX.test(username);
    setValidUsername(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

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

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmited(true);
    if (!validEmail && !validPassword && !validUsername) {
      setErrorMessage(
        "Nieprawidłowe dane. Hasło powinno zawierać co najmniej 10 znaków w tym: mała litera, wielka litera, cyfra i znak specjalny."
      );
    } else if (!validEmail) {
      setErrorMessage("Nieprawidłowy adres email.");
    } else if (!validPassword) {
      setErrorMessage(
        "Nieprawidłowe hasło. Użyj co najmniej 10 znaków w tym: mała litera, wielka litera, cyfra i znak specjalny."
      );
    } else if (!validMatchPassword) {
      setErrorMessage("Hasła są różne.");
    } else if (!validUsername) {
      setErrorMessage(
        'Nieprawidłowa nazwa użytkownika. Użyj co najmniej 4-20 znaków. Dozwolone znaki alfanumeryczne i "_"'
      );
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setGlobalUsername(username);
        navigate("/");
      } catch (e) {
        console.log(e.message);
        if (e.message === "Firebase: Error (auth/invalid-email).") {
          setErrorMessage("Nieprawidłowy login i/lub hasło.");
        } else if (
          e.message === "Firebase: Error (auth/email-already-in-use)."
        ) {
          setErrorMessage("Adres email już istnieje.");
        } else {
          setErrorMessage("Błąd logowania.");
        }
      }
    }
    setTimeout(() => {
      setErrorMessage("");
    }, "10000");
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
            value={username}
            label="Nazwa użytkownika"
            type="text"
            placeholder="Nazwa użytkownika"
            onChange={handleUsername}
            validInput={validUsername}
            isSubmited={isSubmited}
            inputClicked={usernameClicked}
            setInputClicked={setUsernameClicked}
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
