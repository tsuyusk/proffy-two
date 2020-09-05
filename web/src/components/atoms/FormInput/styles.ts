import styled, { keyframes, css } from 'styled-components';

interface ContainerProps {
  type?: string;
  isFocused: boolean;
  isFilled: boolean;
  isFlex: boolean;
  hasError: boolean;
}

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const appearFromBottom = keyframes`
  0% {
    opacity: 0;
    top: -20px;
  }

  100% {
    opacity: 0.9;
  }
`;

export const Container = styled.label<ContainerProps>`
  position: relative;
  display: flex;

  ${props =>
    props.isFlex
      ? css`
          flex: 1;
        `
      : css`
          width: 100%;
        `}
  cursor: text;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  height: 56px;
  border: 1px solid ${props => props.theme.linesInWhite};
  background: ${props => props.theme.shape2};

  ${props =>
    props.hasError &&
    css`
      border-color: ${props => props.theme.redDelete};
      animation: ${shake} 0.82s ease-out;
    `}

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
        top: 20%;
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
      props.hasError &&
      css`
        background: ${props => props.theme.redDelete};
      `}

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

interface ErrorMessageProps {
  hasError: boolean;
  isHovered: boolean;
}

export const ErrorMessage = styled.div<ErrorMessageProps>`
  position: absolute;
  display: none;
  height: fit-content !important;

  > div {
    display: none;
  }

  ${props =>
    props.isHovered &&
    props.hasError &&
    css`
      display: block;
      > div {
        position: relative;
        display: block;
        padding: 4px;
        top: -50px;
        background: ${props => props.theme.redDelete};
        color: #fff;
        border-radius: 4px;
        transition: opacity 0.19s ease-out;
        animation: ${appearFromBottom} 0.2s ease-out;
        opacity: 0.9;

        &::before {
          position: absolute;
          bottom: -10px;
          content: '';
          width: 0;
          height: 0;
          border-left: 20px solid transparent;
          border-right: 20px solid transparent;
          border-top: 20px solid ${props => props.theme.redDelete};
        }
      }
    `}
`;
