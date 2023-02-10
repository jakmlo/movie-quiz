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
        className="input"
      />
    </div>
  );
};

export default PasswordInput;
