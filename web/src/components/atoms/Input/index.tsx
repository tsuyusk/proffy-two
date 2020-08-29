import React, {
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
} from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { Container, CheckboxContainer, ToggleView } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  containerStyle,
  label,
  type,
  name,
  ...rest
}) => {
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
        <input ref={inputRef} id={name} type="checkbox" />
        <label htmlFor={name}>{label}</label>
      </CheckboxContainer>
    );
  }

  return (
    <Container
      htmlFor={name}
      type={type}
      isFilled={isFilled}
      isFocused={isFocused}
      style={containerStyle}
    >
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          id={name}
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
          {...rest}
        />
        {type === 'password' && (
          <ToggleView type="button" onClick={handleToggleView}>
            {isVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
          </ToggleView>
        )}
      </div>
    </Container>
  );
};

export default Input;
