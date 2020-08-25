import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  containerStyle?: object;
}

const Button: React.FC<ButtonProps> = ({
  containerStyle,
  disabled = false,
  ...rest
}) => {
  return <Container style={containerStyle} disabled={disabled} {...rest} />;
};

export default Button;
