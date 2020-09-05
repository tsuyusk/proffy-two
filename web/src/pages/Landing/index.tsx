import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { FiBookOpen, FiTv } from 'react-icons/fi';

import heroImage from '../../assets/hero.svg';
import logoImage from '../../assets/logo.png';

import ProfileHeader from '../../components/organisms/ProfileHeader';
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
  const history = useHistory();
  const [connections, setConnections] = useState(0);
  const { purple, green } = useTheme();

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/connections');

      setConnections(response.data.amount);
    }
    loadData();
  }, []);

  const handleGoToGiveClasses = useCallback(() => {
    history.push('/give-classes');
  }, [history]);

  const handleGoToStudy = useCallback(() => {
    history.push('/study');
  }, [history]);

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
            Total de {connections} {connections === 1 ? 'conexão' : 'conexões'}{' '}
            já realizadas{' '}
            <span role="img" aria-label="purple heart">
              💜
            </span>
          </span>
        </GreetingsContainer>
        <ButtonsContainer>
          <Button backgroundColor={purple} onClick={handleGoToStudy}>
            <FiBookOpen />
            Estudar
          </Button>

          <Button backgroundColor={green} onClick={handleGoToGiveClasses}>
            <FiTv />
            Dar aulas
          </Button>
        </ButtonsContainer>
      </WhiteBox>
    </Container>
  );
};

export default Landing;
