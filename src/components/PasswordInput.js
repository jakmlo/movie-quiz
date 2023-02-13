import React from "react";
import "./PasswordInput.css";

const PasswordInput = (props) => {
  return (
    <div className="input-container">
      <label>Hasło</label>
      <input
        id="password"
        placeholder="●●●●●●●●●●"
        value={props.password}
        type="password"
        onChange={props.handlePassword}
        onBlur={() => props.setPasswordClicked(true)}
        className={
          (!props.validPassword && props.isSubmited) ||
          (!props.validPassword && props.passwordClicked)
            ? "warn-input"
            : "input"
        }
      />
    </div>
  );
};

export default PasswordInput;
