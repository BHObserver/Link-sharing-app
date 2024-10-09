import React from 'react';
import './Input.scss';

const Input = ({ label, type = 'text', placeholder, value, onChange }) => {
  return (
    <div className="input-group">
      <label className="input-group__label">{label}</label>
      <input
        className="input-group__input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
