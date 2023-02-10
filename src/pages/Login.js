import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import "./Login.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <LoginForm />;
};

export default Login;
