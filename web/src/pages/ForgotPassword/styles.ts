import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

  > h1 {
    color: ${props => props.theme.titleColor};
    margin-bottom: 15px;
    width: 250px;
  }
  > p {
    max-width: 210px;
    margin-bottom: 40px;
  }
`;

export const BackArrow = styled(Link)`
  position: absolute;
  top: 30px;
  left: 120px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(-5px);
  }
`;
