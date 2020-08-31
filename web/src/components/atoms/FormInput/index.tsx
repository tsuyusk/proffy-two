import React, {
  InputHTMLAttributes,
  useState,
  useRef,
  useCallback,
} from 'react';

import { Container, ToggleView } from './styles';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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
      isFlex={isFlex}
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

export default FormInput;
