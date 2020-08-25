import React, {
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
} from 'react';

import unActivatedToggleVisibilityIcon from '../../../assets/unActivatedToggleVisibilityIcon.svg';
import activatedToggleVisibilityIcon from '../../../assets/activatedToggleVisibilityIcon.svg';

import { Container, CheckboxContainer, ToggleView } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ placeholder, type, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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

  if (type === 'checkbox') {
    return (
      <CheckboxContainer>
        <input ref={inputRef} id={placeholder} type="checkbox" />
        <label htmlFor={placeholder}>{placeholder}</label>
      </CheckboxContainer>
    );
  }

  return (
    <Container type={type} isFilled={isFilled} isFocused={isFocused}>
      <input
        ref={inputRef}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        type={
          type === 'password'
            ? isVisible
              ? 'text'
              : 'password'
            : type || 'text'
        }
        placeholder={placeholder}
        {...rest}
      />
      {type === 'password' && (
        <ToggleView type="button" onClick={handleToggleView}>
          <img
            src={
              isVisible
                ? activatedToggleVisibilityIcon
                : unActivatedToggleVisibilityIcon
            }
            alt="Eye"
          />
        </ToggleView>
      )}
    </Container>
  );
};

export default Input;
