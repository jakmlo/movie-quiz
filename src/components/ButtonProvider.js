import React from "react";
import "./ButtonProvider.css";

const ButtonProvider = (props) => {
  return (
    <div>
      <button
        onClick={() => props.handleClick(props.provider)}
        className="button"
      >
        <img src={props.src} alt={`${props.name} icon`} className="icon" />
        {`Sign in with ${props.name}`}
      </button>
    </div>
  );
};

export default ButtonProvider;
