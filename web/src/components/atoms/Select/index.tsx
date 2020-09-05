import React, {
  useRef,
  useEffect,
  SelectHTMLAttributes,
  useState,
  useCallback,
  ChangeEvent,
} from 'react';
import { useField } from '@unform/core';

import { Container, ErrorMessage } from './styles';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label: string;
  name: string;
  type?: string;
  labelColor?: string;
  containerStyle?: object;
}

const Select: React.FC<SelectProps> = ({
  options,
  label,
  name,
  type,
  labelColor,
  containerStyle,
  ...rest
}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: () => {
        return selectedOption;
      },
    });
  }, [fieldName, registerField, selectedOption]);

  useEffect(() => {
    setSelectedOption(defaultValue);
  }, [defaultValue]);

  const handleHoverInput = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleStopHoveringInput = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleChangeOption = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedOption(event.target.value);
    },
    [],
  );

  return (
    <Container
      hasError={!!error}
      labelColor={labelColor}
      style={containerStyle}
    >
      <label htmlFor={name}>{label}</label>
      <select
        onMouseOver={handleHoverInput}
        onMouseLeave={handleStopHoveringInput}
        value={selectedOption}
        onChange={handleChangeOption}
        ref={selectRef}
        id={name}
        {...rest}
      >
        <option disabled hidden value="">
          Selecione uma opção
        </option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorMessage hasError={!!error} isHovered={isHovered}>
        <div>{error}</div>
      </ErrorMessage>
    </Container>
  );
};

export default Select;
