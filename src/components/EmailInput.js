import React from "react";
import "./EmailInput.css";

const EmailInput = (props) => {
  return (
    <div className="input-container">
      <label className="email-label">Adres email</label>
      <input
        id="email"
        placeholder="Email"
        value={props.email}
        type="email"
        className={
          (!props.validEmail && props.isSubmited) ||
          (!props.validEmail && props.emailClicked)
            ? "warn-input"
            : "input"
        }
        onChange={props.handleEmail}
        onBlur={() => props.setEmailClicked(true)}
      />
    </div>
  );
};

export default EmailInput;
