import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  width: 100%;
  height: 56px;
  border: 0;
  border-radius: 8px;

  transition: background 0.3s ease-in-out;
  font-weight: 600;
  background: ${props => props.theme.green};
  color: ${props => props.theme.shape};

  &:hover {
    background: ${props => shade(0.2, props.theme.green)};
  }

  ${props =>
    props.disabled &&
    css`
      background: ${props => props.theme.shapesDisabled};
      color: ${props => props.theme.complementTextColor};
    `};
`;
