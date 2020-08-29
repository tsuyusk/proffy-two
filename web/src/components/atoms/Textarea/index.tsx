import React, {
  useCallback,
  useState,
  useRef,
  TextareaHTMLAttributes,
} from 'react';

import { Container } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  subLabel?: string;
  containerStyle?: object;
}

const Textarea: React.FC<TextareaProps> = ({
  containerStyle,
  label,
  name,
  subLabel,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Container style={containerStyle}>
      <label htmlFor={name}>
        {label}
        <span>{subLabel && subLabel}</span>
      </label>
      <textarea id={name} ref={textareaRef} />
    </Container>
  );
};

export default Textarea;
