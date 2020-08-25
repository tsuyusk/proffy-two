import React from 'react';

import proffyLogo from '../../assets/logo.png';
import backArrowImage from '../../assets/backArrow.svg';

import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';

import {
  Container,
  BackgroundImage,
  ContentWrapper,
  Form,
  BackArrow,
} from './styles';

const ForgotPassword: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <BackArrow to="/">
          <img src={backArrowImage} alt="Arrow left" />
        </BackArrow>
        <Form>
          <h1>Eita, esqueceu sua senha?</h1>
          <p>Não esquenta, vamos dar um jeito nisso.</p>
          <Input placeholder="E-mail" type="email" />
          <Button containerStyle={{ marginTop: 15 }}>Enviar</Button>
        </Form>
      </ContentWrapper>
      <BackgroundImage>
        <img src={proffyLogo} alt="Proffy logo" />
      </BackgroundImage>
    </Container>
  );
};

export default ForgotPassword;
