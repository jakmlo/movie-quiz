import React from "react";
import { Navigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { useAuth } from "../hooks/useAuth";
import backgroundImage from "../assets/kino.webp";

import "./Signup.css";

const Signup = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="signup-page">
      <img className="signup-image" alt="Sala kinowa" src={backgroundImage} />
      <div className="signup-form">
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
