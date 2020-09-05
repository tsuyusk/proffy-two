import styled, { keyframes, css } from 'styled-components';

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

interface ContainerProps {
  hasValueInProps: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;

  > label {
    font-size: 14px;
    > span {
      color: ${props => props.theme.inputTextColor};
      font-size: 12px;

      &::before {
        content: ' ';
      }
    }
  }

  > textarea {
    resize: vertical;

    width: 100%;
    background: ${props => props.theme.shape2};
    border: 1px solid ${props => props.theme.linesInWhite};
    border-radius: 8px;
    min-height: 130px;
    ${props =>
      props.hasValueInProps &&
      css`
        color: ${props => props.theme.complementTextColor};
      `};

    ${props =>
      props.hasError &&
      css`
        animation: ${shake} 0.82s ease-out;
        border-color: ${props => props.theme.redDelete};
      `}
  }
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
        top: -16px;
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
