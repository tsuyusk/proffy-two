import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: string;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.label<ContainerProps>`
  position: relative;
  display: flex;
  width: 100%;
  cursor: text;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  height: 56px;
  border: 1px solid ${props => props.theme.linesInWhite};
  background: ${props => props.theme.shape2};

  > label {
    position: absolute;
    font-size: 14px;
    left: 10px;
    cursor: text;
    top: 50%;
    transform: translateY(-50%);
    transition: top 0.3s ease-out;
    color: ${props => props.theme.inputTextColor};

    ${props =>
      (props.isFocused || props.isFilled) &&
      css`
        top: 15%;
      `}
  }

  &::before {
    content: '';
    position: absolute;
    left: -2px;
    width: 2px;
    height: 60%;

    background: ${props => props.theme.purple};
    transform: scale(0, 0);
    transition: transform 0.3s ease-out;

    ${props =>
      (props.isFilled || props.isFocused) &&
      css`
        transform: scale(1, 1);
      `}
  }

  > div {
    flex: 1;
    display: flex;
    height: 80%;
    > input {
      margin: 15px 0 0 10px;
      flex: 1;
      background: transparent;
      border: 0;
    }
  }
`;

export const ToggleView = styled.button`
  background: transparent;
  border: 0;
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;
