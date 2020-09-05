import React, {
  ChangeEvent,
  useCallback,
  useState,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import { FormHandles, Scope } from '@unform/core';
import ReactLoading from 'react-loading';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import Select from '../../components/atoms/Select';
import FormInput from '../../components/atoms/FormInput';
import CustomisableHeader from '../../components/organisms/CustomisableHeader';
import Textarea from '../../components/atoms/Textarea';
import Button from '../../components/atoms/Button';
import api from '../../services/api';
import subjects from '../../constants/subjects';
import weekDays from '../../constants/weekDays';
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import { useToast } from '../../hooks/toast';
import alertIcon from '../../assets/alert.svg';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  HeaderContent,
  UserProfile,
  UploadButton,
  Form,
  InputRow,
  ScheduleItem,
  LabelAndInput,
  AlertMessage,
} from './styles';

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

interface MyProfileFormData {
  name: string;
  lastName: string;
  email: string;
  whatsapp: string;
  bio: string;
  class: {
    subject: string;
    cost: string;
    schedules: Array<{
      week_day: number;
      from: string;
      to: string;
    }>;
  };
}

const MyProfile: React.FC = () => {
  const formRef = useRef<FormHandles | null>(null);
  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const [updateAvatarLoading, setUpdateAvatarLoading] = useState(false);
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const [scheduleAmount, setScheduleAmount] = useState(1);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleAddScheduleItem = useCallback(() => {
    setScheduleAmount(state => (state < 7 ? state + 1 : state));
  }, []);

  const handleGoBack = useCallback(() => {
    history.push('/landing');
  }, [history]);

  const handleSubmit = useCallback(
    async (data: MyProfileFormData) => {
      try {
        setUpdateProfileLoading(true);
        const {
          name,
          lastName,
          email,
          whatsapp,
          bio,
          class: { cost, schedules, subject },
        } = data;

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(2, 'Curto demais')
            .max(30, 'Longo demais')
            .required('Obrigatório'),
          lastName: Yup.string()
            .min(2, 'Curto demais')
            .max(30, 'Longo demais')
            .required('Obrigatório'),
          email: Yup.string().email('Inválido').required('Obrigatório'),
          bio: Yup.string()
            .max(300, 'Biografia grande demais')
            .required('Obrigatório'),
          whatsapp: Yup.string()
            .min(2, 'Curto demais')
            .matches(
              /^(\d{2})[6-9]\d{8}$/,
              'Formato inválido, tente tirar o + e agrupar todos os numeros',
            )
            .required('Obrigatorio'),
          class: Yup.object().shape({
            subject: Yup.string(),
            cost: Yup.string().when('subject', {
              is: value => !!value,
              then: Yup.string().required('Obrigatório'),
              otherwise: Yup.string(),
            }),
            schedules: Yup.array().when('subject', {
              is: value => !!value,
              then: Yup.array().of(
                Yup.object().shape({
                  week_day: Yup.string().required('Obrigatório'),
                  from: Yup.string().required('Obrigatório'),
                  to: Yup.string().required('Obrigatório'),
                }),
              ),
              otherwise: Yup.array(),
            }),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const updateProfileResponse = await api.put('/profile', {
          name,
          lastName,
          email,
          whatsapp,
          bio,
        });

        updateUser(updateProfileResponse.data);

        if (subject) {
          await api.put('/classes', {
            cost,
            subject,
            schedule: schedules,
          });
        }

        addToast({
          title: 'Perfil atualizado com sucesso',
          description: 'Suas alterações foram realizadas com sucesso!',
          type: 'success',
        });

        setUpdateProfileLoading(false);

        history.push('/landing');
      } catch (error) {
        setUpdateProfileLoading(false);
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        console.log(error);

        addToast({
          title: 'Algo deu errado',
          description:
            'Algo deu errado durante a atualização de suas informações, tente novamente',
          type: 'error',
        });
      }
    },
    [updateUser, addToast, history],
  );

  const handleUploadPicture = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        setUpdateAvatarLoading(true);
        if (event.target.files) {
          const data = new FormData();

          data.append('avatar', event.target.files[0]);

          const response = await api.patch('/profile/avatar', data);

          addToast({
            title: 'Atualização de perfil realizada com sucesso',
            description: 'Sua foto de perfil foi atualizada com sucesso',
            type: 'success',
          });

          updateUser(response.data);
        }
      } catch {
        addToast({
          title: 'Algo deu errado',
          description:
            'Algo deu errado durante a atualização de seu perfil, tente novamente',
          type: 'error',
        });
      } finally {
        setUpdateAvatarLoading(false);
      }
    },
    [updateUser, addToast],
  );

  const totalOfScheduleItems = useMemo(() => {
    return Array.from({ length: scheduleAmount }).fill(0);
  }, [scheduleAmount]);

  useEffect(() => {
    async function loadUserData() {
      try {
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

        setScheduleAmount(
          dataWithConvertedMinutes.class.schedules?.length || 1,
        );

        setUserData(dataWithConvertedMinutes);
      } catch {
        addToast({
          title: 'Algo deu errado',
          description:
            'Algo deu errado durante o carregamento de seus dados, tente novamente mais tarde',
          type: 'error',
        });
      }
    }
    loadUserData();
  }, [addToast]);

  return (
    <Container>
      <CustomisableHeader handleGoBack={handleGoBack} pageName="Meu perfil">
        <HeaderContent>
          <UserProfile>
            {user.avatar_url ? (
              <img src={user.avatar_url} alt={user.name} />
            ) : (
              <img
                src="https://image.flaticon.com/icons/png/512/0/14.png"
                alt="Black circle"
              />
            )}
            <input
              type="file"
              id="profilePictureInput"
              onChange={handleUploadPicture}
            />
            <UploadButton htmlFor="profilePictureInput">
              {updateAvatarLoading ? (
                <ReactLoading color="#fff" type="spin" width={50} height={50} />
              ) : (
                <FiCamera color="#fff" size={50} />
              )}
            </UploadButton>
          </UserProfile>
        </HeaderContent>
      </CustomisableHeader>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={userData}>
        <fieldset>
          <legend>Seus dados</legend>
          <hr />
          <InputRow>
            <div>
              <FormInput name="name" label="Nome" />
            </div>

            <div>
              <FormInput name="lastName" label="Sobrenome" />
            </div>
          </InputRow>

          <InputRow>
            <div>
              <FormInput name="email" label="E-mail" />
            </div>

            <div>
              <FormInput name="whatsapp" label="Whatsapp" type="tel" />
            </div>
          </InputRow>

          <Textarea
            maxLength={300}
            name="bio"
            label="Biografia"
            subLabel="(Máximo 300 caractéres)"
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
          <Button loading={updateProfileLoading}>Salvar cadastro</Button>
        </footer>
      </Form>
    </Container>
  );
};

export default MyProfile;
