import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="wd-group">
    <input className="wd-form-input" onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          otherProps.value.length && otherProps.type !== "radio" ? "shrink" : ""
        } wd-form-input-label`}
      >
        {label}
      </label>
    ) : null}
    <div className="wd-warning">{otherProps.error}</div>
  </div>
);

export default FormInput;
