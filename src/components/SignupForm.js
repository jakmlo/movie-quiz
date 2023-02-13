import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../service/firebase";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleLogo from "../assets/google-icon.svg";
import FacebookLogo from "../assets/facebook-icon.svg";
import GithubLogo from "../assets/github-icon.svg";

import "./LoginForm.css";
import ButtonProvider from "./ButtonProvider";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";

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
    if (!EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password)) {
      return;
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (e) {
        setErrorMessage(e.message);
        alert(e.message);
      }
    }
  };

  const handleClick = (provider) => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/");
    });
  };
  return (
    <>
      <span className={errorMessage ? "warn-note" : "warn-note hide"}>
        {errorMessage}
      </span>
      <div className="container">
        <div button-provider-container>
          <ButtonProvider
            src={GoogleLogo}
            handleClick={handleClick}
            provider={googleProvider}
            name="Google"
          />
          <ButtonProvider
            src={FacebookLogo}
            handleClick={handleClick}
            provider={facebookProvider}
            name="Facebook"
          />
          <ButtonProvider
            src={GithubLogo}
            handleClick={handleClick}
            provider={githubProvider}
            name="Github"
          />
        </div>
        <h2 className="title">QuizApp</h2>
        <form onSubmit={handleSubmit}>
          <EmailInput
            email={email}
            handleEmail={handleEmail}
            validEmail={validEmail}
            isSubmited={isSubmited}
            emailClicked={emailClicked}
            setEmailClicked={setEmailClicked}
          />
          <PasswordInput
            password={password}
            handlePassword={handlePassword}
            validPassword={validPassword}
            isSubmited={isSubmited}
            passwordClicked={passwordClicked}
            setPasswordClicked={setPasswordClicked}
          />
          <ConfirmPasswordInput
            matchPassword={matchPassword}
            handleMatchPassword={handleMatchPassword}
            validMatchPassword={validMatchPassword}
            isSubmited={isSubmited}
            matchPasswordClicked={matchPasswordClicked}
            setMatchPasswordClicked={setMatchPasswordClicked}
          />
          <button className="btn" type="submit">
            Zarejestruj się
          </button>
        </form>
        <div>
          <div className="signup-container">
            <p>
              Masz już konto? <Link to="/login">Zaloguj się!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
