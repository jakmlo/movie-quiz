import React from "react";
import "./EmailInput.css";

const EmailInput = (props) => {
  return (
    <div className="input-container">
      <label className="email-label">Nazwa użytkownika</label>
      <input
        id="email"
        placeholder="Email"
        value={props.email}
        type="email"
        className="input"
        onChange={props.handleEmail}
      />
    </div>
  );
};

export default EmailInput;
