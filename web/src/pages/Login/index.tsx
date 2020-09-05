import React, { useState, useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import proffyLogo from '../../assets/logo.png';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import Checkbox from '../../components/atoms/Checkbox';

import {
  Container,
  BackgroundImage,
  ContentWrapper,
  Form,
  Options,
  BottomItems,
} from './styles';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [loginRequestLoading, setLoginRequestLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();
  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      try {
        if (loginRequestLoading) {
          return;
        }
        setLoginRequestLoading(true);
        const { email, password, rememberMe } = data;

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Insira um email válido.'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({ email, password, rememberMe });

        setLoginRequestLoading(false);

        addToast({
          title: 'Login realizado com sucesso!',
          type: 'success',
        });

        history.push('/landing');
      } catch (error) {
        setLoginRequestLoading(false);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Algo deu errado',
          description:
            'Algo deu errado durante o login, cheque suas credenciais e tente novamente',
          type: 'error',
        });
      }
    },
    [signIn, history, addToast, loginRequestLoading],
  );

  return (
    <Container>
      <BackgroundImage>
        <img src={proffyLogo} alt="Proffy logo" />
      </BackgroundImage>
      <ContentWrapper>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Fazer login</h1>
          <Input name="email" label="E-mail" type="email" />
          <Input name="password" label="Senha" type="password" />
          <Button
            loading={loginRequestLoading}
            containerStyle={{ marginTop: 15 }}
          >
            Entrar
          </Button>
          <Options>
            <Checkbox name="rememberMe" type="checkbox" label="Lembrar-me" />
            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Options>
        </Form>
        <BottomItems>
          <p>
            Não tem conta?
            <Link to="/register">Cadastre-se</Link>
          </p>
          <span>
            É de graça
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
