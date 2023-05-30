import React from "react";
import "./Alert.scss";

const Alert = (error) => {
  return (
    <>
      <span className="warn-alert">{error.error}</span>
    </>
  );
};

export default Alert;
