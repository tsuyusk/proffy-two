import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Scope, FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Select from '../../components/atoms/Select';
import FormInput from '../../components/atoms/FormInput';
import CustomisableHeader from '../../components/organisms/CustomisableHeader';
import Textarea from '../../components/atoms/Textarea';
import Button from '../../components/atoms/Button';

import alertIcon from '../../assets/alert.svg';
import Input from '../../components/atoms/Input';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  HeaderContent,
  ProfileContainer,
  Form,
  ProfileAndInputContainer,
  InputRow,
  ScheduleItem,
  LabelAndInput,
  AlertMessage,
} from './styles';
import subjects from '../../constants/subjects';
import weekDays from '../../constants/weekDays';
import api from '../../services/api';
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

interface GiveClassesFormData {
  class: {
    subject: string;
    cost: string;
    schedules: Array<{
      week_day: string;
      from: string;
      to: string;
    }>;
  };
}

interface UserData {
  name: string;
  lastName: string;
  email: string;
  whatsapp: string;
  bio: string;
  class: {
    subject: string;
    cost: string;
    schedules: Array<{
      id: string;
      week_day: number;
      from: string;
      to: string;
    }>;
  };
}

interface MyProfileResponse {
  name: string;
  lastName: string;
  email: string;
  whatsapp: string;
  bio: string;
  class: {
    subject: string;
    cost: string;
    schedules: Array<{
      id: string;
      week_day: number;
      from: number;
      to: number;
    }>;
  };
}

const GiveClasses: React.FC = () => {
  const [addClassRequestLoading, setAddClassRequestLoading] = useState(false);
  const [userData, setUserData] = useState({} as UserData);
  const [scheduleAmount, setScheduleAmount] = useState(1);
  const formRef = useRef<FormHandles | null>(null);
  const { user } = useAuth();
  const history = useHistory();
  const { addToast } = useToast();

  const handleGoBack = useCallback(() => {
    history.push('/landing');
  }, [history]);

  const handleSubmit = useCallback(
    async (data: GiveClassesFormData) => {
      try {
        if (addClassRequestLoading) {
          return;
        }
        setAddClassRequestLoading(true);
        if (userData.class.schedules) {
          setAddClassRequestLoading(false);
          addToast({
            title: 'Não foi possivel registrar uma nova aula',
            description:
              'Não é possivel registrar uma nova aula caso você já tenha registrado uma, caso queira atualizar-la, vá em seu perfil.',
            type: 'error',
          });
          return;
        }

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          class: Yup.object().shape({
            subject: Yup.string().required('Obrigatório'),
            cost: Yup.string().required('Obrigatório'),
            schedules: Yup.array().of(
              Yup.object().shape({
                week_day: Yup.string().required('Obrigatório'),
                from: Yup.string().required('Obrigatório'),
                to: Yup.string().required('Obrigatório'),
              }),
            ),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { cost, subject, schedules: schedule } = data.class;

        const scheduleWithFormattedWeekDay = schedule.map(schedule => ({
          ...schedule,
          week_day: Number(schedule.week_day),
        }));

        await api.post('/classes', {
          cost: Number(cost),
          subject,
          schedule: scheduleWithFormattedWeekDay,
        });

        setAddClassRequestLoading(false);

        addToast({
          title: 'Aula criada com sucesso!',
          type: 'success',
        });

        history.push('/completed-creation');
      } catch (error) {
        setAddClassRequestLoading(false);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          title: 'Algo deu errado',
          description: 'Algo deu errado na criação da aula, tente novamente',
          type: 'error',
        });
      }
    },
    [history, userData.class, addToast, addClassRequestLoading],
  );

  useEffect(() => {
    async function loadProfileData() {
      const response = await api.get<MyProfileResponse>('/profile/me');

      const dataWithConvertedMinutes = {
        ...response.data,
        class: {
          ...response.data.class,
          schedules:
            response.data.class?.schedules.map(scheduleItem => ({
              ...scheduleItem,
              to: convertMinutesToHours(scheduleItem.to, false),
              from: convertMinutesToHours(scheduleItem.from, false),
            })) || null,
        },
      };

      setScheduleAmount(dataWithConvertedMinutes.class.schedules?.length || 1);

      setUserData(dataWithConvertedMinutes);
    }
    loadProfileData();
  }, []);

  const handleAddScheduleItem = useCallback(() => {
    setScheduleAmount(state => (state <= 7 ? state + 1 : state));
  }, []);

  const totalOfScheduleItems = useMemo(() => {
    return Array.from({ length: scheduleAmount }).fill(0);
  }, [scheduleAmount]);

  return (
    <Container>
      <CustomisableHeader handleGoBack={handleGoBack} pageName="Dar aulas">
        <HeaderContent>
          <h1>Que incrivel que você quer dar aulas.</h1>
          <p>O primeiro passo é preencher esse formulário de inscrição</p>
        </HeaderContent>
      </CustomisableHeader>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={userData}>
        <fieldset>
          <legend>Seus dados</legend>
          <hr />
          <ProfileAndInputContainer>
            <ProfileContainer>
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/png/512/0/14.png"
                  alt="Black circle"
                />
              )}
              <h3>
                {user.name} {user.lastName}
              </h3>
            </ProfileContainer>
            <Input
              containerStyle={{ marginLeft: 32, marginRight: 50, height: 56 }}
              name="whatsapp"
              label="Whatsapp"
              defaultValue={user.whatsapp || 'Não adicionado à sua conta ainda'}
              readOnly
            />
          </ProfileAndInputContainer>

          <Textarea
            maxLength={300}
            name="bio"
            label="Biografia"
            subLabel="(Máximo 300 caractéres)"
            readOnly
            defaultValue={user.bio || 'Não adicionado à sua conta ainda'}
          />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>
          <hr />
          <Scope path="class">
            <InputRow>
              <LabelAndInput>
                <label>Matéria</label>
                <Select
                  containerStyle={{ width: 380, marginRight: 30 }}
                  options={subjects}
                  label=""
                  name="subject"
                />
              </LabelAndInput>

              <FormInput
                name="cost"
                label="Custo da sua hora por aula"
                min="1"
                max="1000"
                type="number"
                containerStyle={{ marginTop: 14 }}
              />
            </InputRow>
          </Scope>
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button type="button" onClick={handleAddScheduleItem}>
              + Novo horário
            </button>
          </legend>
          <hr />
          {totalOfScheduleItems.map((_, index) => (
            <Scope path={`class.schedules[${index}]`} key={index}>
              <ScheduleItem>
                <LabelAndInput>
                  <label>Dia da semana</label>
                  <Select options={weekDays} label="" name="week_day" />
                </LabelAndInput>

                <LabelAndInput>
                  <label>De</label>
                  <FormInput name="from" label="" type="time" />
                </LabelAndInput>

                <LabelAndInput>
                  <label>Até</label>
                  <FormInput name="to" label="" type="time" />
                </LabelAndInput>
              </ScheduleItem>
            </Scope>
          ))}
        </fieldset>

        <footer>
          <AlertMessage>
            <img src={alertIcon} alt="Exclamation" />
            <div>
              <strong>Importante!</strong>
              <span>Preencha todos os dados corretamente</span>
            </div>
          </AlertMessage>
          <Button loading={addClassRequestLoading}>Salvar cadastro</Button>
        </footer>
      </Form>
    </Container>
  );
};

export default GiveClasses;
