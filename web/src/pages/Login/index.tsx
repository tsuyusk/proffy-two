import React from 'react';
import { Link } from 'react-router-dom';

import proffyLogo from '../../assets/logo.png';

import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';

import {
  Container,
  BackgroundImage,
  ContentWrapper,
  Form,
  Options,
  BottomItems,
} from './styles';

const Login: React.FC = () => {
  return (
    <Container>
      <BackgroundImage>
        <img src={proffyLogo} alt="Proffy logo" />
      </BackgroundImage>
      <ContentWrapper>
        <Form>
          <h1>Fazer login</h1>
          <Input placeholder="E-mail" type="email" />
          <Input placeholder="Senha" type="password" />
          <Button containerStyle={{ marginTop: 15 }}>Entrar</Button>
          <Options>
            <Input type="checkbox" placeholder="Lembrar-me" />
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Options>
        </Form>
        <BottomItems>
          <p>
            Não tem conta?
            <Link to="/register">Cadastre-se</Link>
          </p>
          <span>
            É de graça{' '}
            <span role="img" aria-label="Purple heart">
              💜
            </span>
          </span>
        </BottomItems>
      </ContentWrapper>
    </Container>
  );
};

export default Login;
