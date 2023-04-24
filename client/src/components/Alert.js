import React from "react";
import "./Alert.css";

const Alert = (error) => {
  return (
    <>
      <span className="warn-alert">{error.error}</span>
    </>
  );
};

export default Alert;
