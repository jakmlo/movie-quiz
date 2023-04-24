import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import backgroundImage from "../assets/kino.webp";
import "./Login.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="login-page">
      <img className="login-image" alt="Sala kinowa" src={backgroundImage} />
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
