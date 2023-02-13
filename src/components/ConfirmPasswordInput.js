import React from "react";
import "./ConfirmPasswordInput.css";

const ConfirmPasswordInput = (props) => {
  return (
    <div className="input-container">
      <label>Potwierdź hasło</label>
      <input
        id="confirm-password"
        type="password"
        placeholder="●●●●●●●●●●"
        maxLength="24"
        onChange={props.handleMatchPassword}
        onBlur={() => props.setMatchPasswordClicked(true)}
        className={
          (!props.validMatchPassword && props.isSubmited) ||
          (!props.validMatchPassword && props.matchPasswordClicked)
            ? "warn-input"
            : "input"
        }
        value={props.matchPassword}
      />
    </div>
  );
};

export default ConfirmPasswordInput;
