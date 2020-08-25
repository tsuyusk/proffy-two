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

const Register: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <BackArrow to="/">
          <img src={backArrowImage} alt="Arrow left" />
        </BackArrow>
        <Form>
          <h1>Cadastro</h1>
          <p>Preencha os dados abaixo para começar.</p>
          <Input placeholder="Nome" />
          <Input placeholder="Sobrenome" />
          <Input placeholder="E-mail" type="email" />
          <Input placeholder="Senha" type="password" />
          <Button containerStyle={{ marginTop: 15 }}>Concluir cadastro</Button>
        </Form>
      </ContentWrapper>
      <BackgroundImage>
        <img src={proffyLogo} alt="Proffy logo" />
      </BackgroundImage>
    </Container>
  );
};

export default Register;
