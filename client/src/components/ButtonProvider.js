import React from "react";
import "./ButtonProvider.scss";

const ButtonProvider = (props) => {
  return (
    <>
      <button
        onClick={() => props.handleClick(props.provider)}
        className="button"
      >
        <img src={props.src} alt={`${props.name} icon`} className="icon" />
      </button>
    </>
  );
};

export default ButtonProvider;
