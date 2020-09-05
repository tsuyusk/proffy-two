import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import proffyLogo from '../../assets/logo.png';
import backArrowImage from '../../assets/backArrow.svg';

import { useToast } from '../../hooks/toast';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  BackgroundImage,
  ContentWrapper,
  Form,
  BackArrow,
} from './styles';

interface RegisterFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [registerRequestLoading, setRegisterRequestLoading] = useState(false);
  const formRef = useRef<FormHandles | null>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: RegisterFormData) => {
      try {
        if (registerRequestLoading) {
          return;
        }
        setRegisterRequestLoading(true);
        const { name, lastName, email, password } = data;

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(2, 'Curto demais')
            .max(30, 'Longo demais')
            .required('Nome obrigatório'),
          lastName: Yup.string()
            .min(2, 'Curto demais')
            .max(30, 'Longo demais')
            .required('Sobrenome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um Email valido'),
          password: Yup.string().min(6, 'No mínmo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', {
          name,
          lastName,
          email,
          password,
        });

        setRegisterRequestLoading(false);

        history.push('/completed-register');
      } catch (error) {
        setRegisterRequestLoading(false);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        const { message: errorMessage } = error.response.data;

        if (errorMessage === 'Email already taken') {
          addToast({
            title: 'E-mail já em uso',
            description:
              'O E-mail que você inseriu já está em uso, tente novamente com um outro email',
            type: 'error',
          });
          return;
        }

        addToast({
          title: 'Algo deu errado',
          description:
            'Algo deu errado durante a criação de sua conta, tente novamente',
          type: 'error',
        });
      }
    },
    [history, addToast, registerRequestLoading],
  );

  return (
    <Container>
      <ContentWrapper>
        <BackArrow to="/">
          <img src={backArrowImage} alt="Arrow left" />
        </BackArrow>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <h1>Cadastro</h1>
          <p>Preencha os dados abaixo para começar.</p>
          <Input name="name" label="Nome" />
          <Input name="lastName" label="Sobrenome" />
          <Input name="email" label="E-mail" type="email" />
          <Input name="password" label="Senha" type="password" />
          <Button
            loading={registerRequestLoading}
            containerStyle={{ marginTop: 15 }}
          >
            Concluir cadastro
          </Button>
        </Form>
      </ContentWrapper>
      <BackgroundImage>
        <img src={proffyLogo} alt="Proffy logo" />
      </BackgroundImage>
    </Container>
  );
};

export default Register;
