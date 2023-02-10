import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../service/firebase";
import { collection, addDoc } from "firebase/firestore";
import { signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import GoogleLogo from "../assets/google-icon.svg";
import FacebookLogo from "../assets/facebook-icon.svg";
import GithubLogo from "../assets/github-icon.svg";

import "./LoginForm.css";
import ButtonProvider from "./ButtonProvider";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

const SignupForm = () => {
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
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      setErrorMessage(e.message);
      alert(e.message);
    }
  };

  const handleClick = (provider) => {
    signInWithPopup(auth, provider).then((data) => {
      console.log(auth.currentUser.displayName);
      navigate("/");
    });
  };
  return (
    <>
      <span className={errorMessage ? "warn-note" : "warn-note hide"}>
        {errorMessage}
      </span>
      <div className="container">
        <div>
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
        <h2>QuizApp</h2>
        <form onSubmit={handleSubmit}>
          <EmailInput email={email} handleEmail={handleEmail} />
          <PasswordInput password={password} handlePassword={handlePassword} />
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
