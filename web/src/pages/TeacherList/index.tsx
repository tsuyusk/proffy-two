import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'styled-components';
import ReactLoading from 'react-loading';
import { FiSearch } from 'react-icons/fi';
import * as Yup from 'yup';

import subjects from '../../constants/subjects';
import weekDays from '../../constants/weekDays';
import CustomisableHeader from '../../components/organisms/CustomisableHeader';
import TeacherItem, { ClassData } from '../../components/organisms/TeacherItem';
import Select from '../../components/atoms/Select';
import api from '../../services/api';
import {
  Container,
  HeaderContent,
  List,
  HeaderForm,
  LabelAndInput,
  FormInput,
  NoClassesMessageContainer,
  LoadingContainer,
} from './styles';
import { useToast } from '../../hooks/toast';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';

interface HeaderFormData {
  subject: string;
  week_day: string;
  time: string;
}

const TeacherList: React.FC = () => {
  const formRef = useRef<FormHandles | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const history = useHistory();
  const { addToast } = useToast();
  const { baseTextColorInPurple, purple } = useTheme();

  const handleSubmit = useCallback(
    async (data: HeaderFormData) => {
      try {
        setLoadingClasses(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          subject: Yup.string().required('Obrigatório'),
          week_day: Yup.string().required('Obrigatório'),
          time: Yup.string().required('Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { subject, week_day, time } = data;

        const response = await api.get<ClassData[]>('/classes', {
          params: { subject, week_day, time },
        });
        const teachersDataWithFormattedCost = response.data.map(classItem => ({
          ...classItem,
          formattedCost: Number(classItem.cost).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }),
        }));

        setHasSearched(true);
        setClasses(teachersDataWithFormattedCost);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Algo deu errado',
          description:
            'Algo deu errado durante o carregamento dos dados dos professores, tente novamente mais tarde',
          type: 'error',
        });
      } finally {
        setLoadingClasses(false);
      }
    },
    [addToast],
  );

  const handleGoBack = useCallback(() => {
    history.push('/landing');
  }, [history]);

  useEffect(() => {
    async function loadTeachers() {
      try {
        const response = await api.get<ClassData[]>('/classes');

        const teachersDataWithFormattedCost = response.data.map(classItem => ({
          ...classItem,
          formattedCost: Number(classItem.cost).toLocaleString('pt-BR', {
            currency: 'BRL',
            style: 'currency',
          }),
        }));

        setClasses(teachersDataWithFormattedCost);
      } catch {
        addToast({
          title: 'Algo deu errado',
          description:
            'Algo deu errado durante o carregamento dos dados dos professores, tente novamente mais tarde',
          type: 'error',
        });
      } finally {
        setLoadingClasses(false);
      }
    }
    loadTeachers();
  }, [addToast]);

  return (
    <Container>
      <CustomisableHeader pageName="Estudar" handleGoBack={handleGoBack}>
        <HeaderContent>
          <h1>Estes são os proffys disponíveis</h1>
          <HeaderForm ref={formRef} onSubmit={handleSubmit}>
            <Select
              labelColor={baseTextColorInPurple}
              label="Matéria"
              name="subject"
              options={subjects}
            />
            <Select
              labelColor={baseTextColorInPurple}
              label="Dia da semana"
              name="week_day"
              options={weekDays}
            />

            <LabelAndInput>
              <label htmlFor="name">Horário</label>
              <FormInput
                containerStyle={{ height: 69 }}
                style={{ margin: '4px 0 0 10px' }}
                label=""
                name="time"
                type="time"
                isFlex={true}
              />
            </LabelAndInput>
            <button type="submit">
              <FiSearch size={25} />
            </button>
          </HeaderForm>
        </HeaderContent>
      </CustomisableHeader>
      {loadingClasses ? (
        <LoadingContainer>
          <ReactLoading type="spin" color={purple} />
        </LoadingContainer>
      ) : (
        <List>
          {classes.length === 0 && (
            <NoClassesMessageContainer>
              <p>
                {hasSearched
                  ? 'Nenhum professor encontrado com sua pesquisa.'
                  : 'Nenhum professor encontrado'}
              </p>
            </NoClassesMessageContainer>
          )}
          {classes.map(classItem => (
            <TeacherItem classData={classItem} key={classItem.id} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default TeacherList;
