import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: string;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 8px;
  justify-content: center;
  width: 350px;
  height: 72px;
  border: 1px solid ${props => props.theme.linesInWhite};
  background: ${props => props.theme.shape2};

  & + div {
    border-top: 0;
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

  > input {
    width: 90%;
    height: 100%;
    background: transparent;
    border: 0;

    ${props =>
      props.type === 'password' &&
      css`
        margin-left: 18px;
      `}
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 130px;
`;

export const ToggleView = styled.button`
  background: transparent;
  border: 0;
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;
