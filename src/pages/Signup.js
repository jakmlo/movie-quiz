import React from "react";
import { Navigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }
  return <SignupForm />;
};

export default Signup;
