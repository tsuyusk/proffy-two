import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  TextareaHTMLAttributes,
} from 'react';
import { useField } from '@unform/core';

import { Container, ErrorMessage } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  subLabel?: string;
  containerStyle?: object;
}

const Textarea: React.FC<TextareaProps> = ({
  children,
  containerStyle,
  label,
  name,
  defaultValue: propDefaultValue,
  subLabel,
  ...rest
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textareaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleHoverInput = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleStopHoveringInput = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Container
      hasError={!!error}
      hasValueInProps={!!propDefaultValue}
      style={containerStyle}
    >
      <label htmlFor={name}>
        {label}
        <span>{subLabel && subLabel}</span>
      </label>
      <textarea
        onMouseOver={handleHoverInput}
        onMouseLeave={handleStopHoveringInput}
        defaultValue={propDefaultValue || defaultValue}
        id={name}
        ref={textareaRef}
        {...rest}
      >
        {children}
      </textarea>
      <ErrorMessage hasError={!!error} isHovered={isHovered}>
        <div>{error}</div>
      </ErrorMessage>
    </Container>
  );
};

export default Textarea;
