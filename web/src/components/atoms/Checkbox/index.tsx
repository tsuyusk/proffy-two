import React, { InputHTMLAttributes, useRef } from 'react';

import { CheckboxContainer } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Checkbox: React.FC<InputProps> = ({ label, type, name, ...rest }) => {
  const checkboxRef = useRef<HTMLInputElement>(null);

  return (
    <CheckboxContainer>
      <input ref={checkboxRef} id={name} type="checkbox" {...rest} />
      <label htmlFor={name}>{label}</label>
    </CheckboxContainer>
  );
};

export default Checkbox;
