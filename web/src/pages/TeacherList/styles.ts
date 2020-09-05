import styled from 'styled-components';
import { Form } from '@unform/web';
import AtomFormInput from '../../components/atoms/FormInput';

export const Container = styled.div``;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
  > h1 {
    width: 350px;
    color: ${props => props.theme.titleInPurple};
    font-size: 36px;
    align-self: start;
  }
`;

export const HeaderForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: 50px 0 -50px;

  > * {
    margin-left: 10px;
  }

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;

    color: ${props => props.theme.shape};
    border-radius: 8px;
    border: 0;
    background: ${props => props.theme.green};
    margin-top: 25px;
    height: 80%;
    width: 50px;
  }
`;

export const LabelAndInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  > label {
    color: ${props => props.theme.baseTextColorInPurple};
    font-size: 14px;
  }
`;

export const FormInput = styled(AtomFormInput)``;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  margin: 20px auto 0;
`;

export const NoClassesMessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;

  > p {
    text-align: center;
  }
`;

export const LoadingContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 740px;
  height: 350px;
  margin: 20px auto 0;
`;
