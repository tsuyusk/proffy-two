import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form as UnformForm } from '@unform/web';
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

  background-color: ${props => props.theme.purple};
  background-image: url(${backgroundImage});
  background-size: contain;
  background-position: center;

  @media screen and (max-width: 700px) {
    > img {
      flex: 1;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 672px;
  background: ${props => props.theme.background};
`;

export const Form = styled(UnformForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > h1 {
    color: ${props => props.theme.titleColor};
  }

  > p {
    max-width: 210px;
    margin-bottom: 40px;
  }
`;

export const BackArrow = styled(Link)`
  position: absolute;
  top: 27px;
  left: 120px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(-5px);
  }
`;
