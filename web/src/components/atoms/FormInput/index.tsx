import React, {
  InputHTMLAttributes,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';

import { Container, ToggleView, ErrorMessage } from './styles';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useField } from '@unform/core';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  isFlex?: boolean;
  containerStyle?: object;
}

const FormInput: React.FC<FormInputProps> = ({
  containerStyle,
  name,
  label,
  isFlex = false,
  type,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleHoverInput = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleStopHoveringInput = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleToggleView = useCallback(() => {
    setIsVisible(state => !state);
  }, []);

  useEffect(() => {
    setIsFilled(!!inputRef.current?.value);
  }, [defaultValue]);

  return (
    <Container
      onMouseOver={handleHoverInput}
      onMouseLeave={handleStopHoveringInput}
      htmlFor={name}
      type={type}
      isFilled={isFilled}
      isFocused={isFocused}
      hasError={!!error}
      style={containerStyle}
      isFlex={isFlex}
    >
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          id={name}
          ref={inputRef}
          defaultValue={defaultValue}
          autoComplete="off"
          onBlur={handleInputBlur}
          onFocus={handleInputFocus}
          type={
            type === 'password'
              ? isVisible
                ? 'text'
                : 'password'
              : type || 'text'
          }
          {...rest}
        />
        {type === 'password' && (
          <ToggleView type="button" onClick={handleToggleView}>
            {isVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </ToggleView>
        )}
      </div>
      <ErrorMessage hasError={!!error} isHovered={isHovered}>
        <div>{error}</div>
      </ErrorMessage>
    </Container>
  );
};

export default FormInput;
