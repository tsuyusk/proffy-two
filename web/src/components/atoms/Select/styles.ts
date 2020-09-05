import styled, { css, keyframes } from 'styled-components';

interface ContainerProps {
  labelColor: string | undefined;
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

export const Container = styled.div<ContainerProps>`
  position: relative;
  border-radius: 8px;
  height: 64px;
  flex: 1;

  > label {
    color: ${props => (props.labelColor ? props.labelColor : 'auto')};
    font-size: 14px;
  }

  > select {
    border-radius: 8px;
    background: ${props => props.theme.shape2};
    border: 1px solid ${props => props.theme.linesInWhite};
    width: 100%;
    height: 56px;
    font-size: 16px;
    padding: 0 16px;

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
        top: -96px;
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
