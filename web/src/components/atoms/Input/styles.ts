import styled, { css } from 'styled-components';

interface ContainerProps {
  type?: string;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.label<ContainerProps>`
  position: relative;
  display: flex;
  cursor: text;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  width: 350px;
  height: 72px;
  padding: 4px 12px;
  border: 1px solid ${props => props.theme.linesInWhite};
  background: ${props => props.theme.shape2};

  > label {
    position: absolute;
    cursor: text;
    font-size: 14px;
    top: 50%;
    transform: translateY(-50%);
    transition: top 0.3s ease-out;
    color: ${props => props.theme.inputTextColor};

    ${props =>
      (props.isFocused || props.isFilled) &&
      css`
        top: 10%;
      `};
  }

  & + div {
    border-top: 0;
  }

  &::before {
    content: '';
    position: absolute;
    left: -2px;
    top: 20%;
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
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    margin-top: 15px;
    > input {
      flex: 1;
      background: transparent;
      border: 0;
      margin-bottom: 4px;
    }
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

  > svg {
    color: ${props => props.theme.purple};
  }
`;
