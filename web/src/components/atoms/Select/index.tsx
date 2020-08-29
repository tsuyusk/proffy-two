import React, { SelectHTMLAttributes } from 'react';

import { Container } from './styles';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label: string;
  name: string;
  type?: string;
  containerStyle?: object;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  name,
  type,
  containerStyle,
  ...rest
}) => {
  return (
    <Container style={containerStyle}>
      <label htmlFor={name}>{label}</label>
      <select value="" id={name} {...rest}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
