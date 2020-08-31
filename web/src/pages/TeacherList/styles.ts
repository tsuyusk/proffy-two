import styled from 'styled-components';
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

export const HeaderForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  margin: 50px 0 -50px;

  > * {
    margin-left: 10px;
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
