import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';

import Select from '../../components/atoms/Select';
import FormInput from '../../components/atoms/FormInput';
import CustomisableHeader from '../../components/molecules/CustomisableHeader';
import Textarea from '../../components/atoms/Textarea';
import Button from '../../components/atoms/Button';

import alertIcon from '../../assets/alert.svg';

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
import Input from '../../components/atoms/Input';

const GiveClasses: React.FC = () => {
  const history = useHistory();

  const handleGoBack = useCallback(() => {
    history.push('/landing');
  }, [history]);

  return (
    <Container>
      <CustomisableHeader handleGoBack={handleGoBack} pageName="Dar aulas">
        <HeaderContent>
          <h1>Que incrivel que você quer dar aulas.</h1>
          <p>O primeiro passo é preencher esse formulário de inscrição</p>
        </HeaderContent>
      </CustomisableHeader>
      <Form>
        <fieldset>
          <legend>Seus dados</legend>
          <hr />
          <ProfileAndInputContainer>
            <ProfileContainer>
              <img
                src="https://avatars3.githubusercontent.com/u/53716129?s=460&u=edacca5253ac7c836de527f0abd9d07c5bf72479&v=4"
                alt="User avatar"
              />
              <h3>Tiago luchtenberg</h3>
            </ProfileContainer>
            <Input
              containerStyle={{ marginLeft: 32, marginRight: 50, height: 56 }}
              name="whatsapp"
              label="Whatsapp"
              type="tel"
            />
          </ProfileAndInputContainer>

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
          <InputRow>
            <LabelAndInput>
              <label>Matéria</label>
              <Select
                containerStyle={{ width: 380, marginRight: 30 }}
                options={[
                  { label: 'Matemática', value: 'maths' },
                  { label: 'Português', value: 'portuguese' },
                  { label: 'História', value: 'history' },
                  { label: 'Geografia', value: 'geography' },
                ]}
                label=""
                name="day"
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
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button>+ Novo horário</button>
          </legend>
          <hr />

          <ScheduleItem>
            <LabelAndInput>
              <label>Dia da semana</label>
              <Select
                options={[{ label: 'Segunda-feira', value: '0' }]}
                label=""
                name="day"
              />
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
        </fieldset>

        <footer>
          <AlertMessage>
            <img src={alertIcon} alt="Exclamation" />
            <div>
              <strong>Importante!</strong>
              <span>Preencha todos os dados corretamente</span>
            </div>
          </AlertMessage>
          <Button>Salvar cadastro</Button>
        </footer>
      </Form>
    </Container>
  );
};

export default GiveClasses;
