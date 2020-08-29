import styled from 'styled-components';
import { shade, transparentize } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  margin-top: 10px;
  width: 100vw;
`;

export const UserContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: transparent;
  border: 0;

  > img {
    margin-right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  > span {
    transition: color 0.3s ease-out;
    color: ${props => props.theme.baseTextColorInPurple};
  }

  &:hover {
    > span {
      color: ${props => transparentize(0.2, props.theme.baseTextColorInPurple)};
    }
  }
`;

export const SignOffButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 0;
  background: ${props => shade(0.3, props.theme.purple)};
  transition: background 0.3s ease-out;

  > svg {
    color: ${props => props.theme.baseTextColorInPurple};
  }

  &:hover {
    background: ${props => shade(0.4, props.theme.purple)};
  }
`;
