import React from "react";
import "./InputField.scss";

const InputField = (props) => {
  return (
    <div className="input-field">
      <label htmlFor={props.label} className="input-field__label">
        {props.label}
      </label>
      <input
        id={props.label}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        onBlur={() => props.setInputClicked(true)}
        className={
          (!props.validInput && props.isSubmited) ||
          (!props.validInput && props.inputClicked)
            ? "input-field__input--invalid"
            : "input-field__input"
        }
      />
    </div>
  );
};

export default InputField;
