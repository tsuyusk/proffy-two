import styled from 'styled-components';
import { shade } from 'polished';

import backgroundImage from '../../assets/proffy-bg.png';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const BackgroundImage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  background-color: ${props => props.theme.purple};
  background-image: url(${backgroundImage});
  background-size: contain;
  background-position: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 672px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.background};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: auto;

  > h1 {
    color: ${props => props.theme.titleColor};
    margin-bottom: 15px;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 25px;
  color: ${props => props.theme.complementTextColor};
  font-size: 14px;

  > a {
    transition: color 0.3s ease;
    color: ${props => props.theme.complementTextColor};

    &:hover {
      color: ${props => shade(0.2, props.theme.complementTextColor)};
    }
  }
`;

export const BottomItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto 0 30px;
  width: 50%;

  > p {
    color: ${props => props.theme.baseTextColor};
    width: fit-content;

    > a {
      display: block;
      width: fit-content;
      transition: color 0.3s ease;
      color: ${props => props.theme.purple};

      &:hover {
        color: ${props => shade(0.2, props.theme.purple)};
      }
    }
  }

  > span {
    color: ${props => props.theme.complementTextColor};
    font-size: 14px;
  }
`;
