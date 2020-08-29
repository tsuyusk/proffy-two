import React, {
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
} from 'react';

import unActivatedToggleVisibilityIcon from '../../../assets/unActivatedToggleVisibilityIcon.svg';
import activatedToggleVisibilityIcon from '../../../assets/activatedToggleVisibilityIcon.svg';

import { Container, ToggleView } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  containerStyle,
  name,
  label,
  type,
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
      </div>
    </Container>
  );
};

export default Input;
