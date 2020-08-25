import React from 'react';
import { useTheme } from 'styled-components';

import studyIcon from '../../assets/study.svg';
import televisionIcon from '../../assets/television.svg';
import heroImage from '../../assets/hero.svg';
import logoImage from '../../assets/logo.png';

import ProfileHeader from '../../components/molecules/ProfileHeader';
import {
  Container,
  ImagesContainer,
  LogoContainer,
  HeroContainer,
  WhiteBox,
  GreetingsContainer,
  ButtonsContainer,
  Button,
} from './styles';

const Landing: React.FC = () => {
  const { purple, green } = useTheme();
  return (
    <Container>
      <ProfileHeader />
      <ImagesContainer>
        <LogoContainer>
          <img src={logoImage} alt="Proffy Logo" />
        </LogoContainer>
        <HeroContainer>
          <img src={heroImage} alt="Online Studying" />
        </HeroContainer>
      </ImagesContainer>
      <WhiteBox>
        <GreetingsContainer>
          <p>
            Seja bem-vindo.
            <strong>O que deseja fazer?</strong>
          </p>
          <span>
            Total de 285 conexões já realizadas{' '}
            <span role="img" aria-label="purple heart">
              💜
            </span>
          </span>
        </GreetingsContainer>
        <ButtonsContainer>
          <Button backgroundColor={purple}>
            <img src={studyIcon} alt="Opened book" />
            Estudar
          </Button>

          <Button backgroundColor={green}>
            <img src={televisionIcon} alt="Television" />
            Dar aulas
          </Button>
        </ButtonsContainer>
      </WhiteBox>
    </Container>
  );
};

export default Landing;
