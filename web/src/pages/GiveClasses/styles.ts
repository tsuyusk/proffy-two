import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  margin: 0 auto;

  > h1 {
    width: 380px;
    color: ${props => props.theme.titleInPurple};
    font-size: 36px;
  }

  > p {
    max-width: 280px;
    color: ${props => props.theme.baseTextColorInPurple};
  }
`;

export const Form = styled(UnformForm)`
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  background: ${props => props.theme.shape};
  width: 100%;
  max-width: 740px;
  margin: -32px auto 32px;
  padding: 32px 16px 16px;

  > fieldset {
    & + fieldset {
      margin-top: 16px;
    }

    width: 100%;
    border: 0;

    > hr {
      border-top: 1px dotted ${props => props.theme.linesInWhite};
    }

    > legend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 24px;
      color: ${props => props.theme.titleColor};

      > button {
        border: 0;
        background: transparent;
        color: ${props => props.theme.purple};
        transition: color 0.3s ease-out;

        &:hover {
          color: ${props => props.theme.littlePurple};
        }
      }
    }
  }

  > footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${props => props.theme.shape2};
    padding: 10px 0;
  }
`;

export const ProfileAndInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 250px;
  width: 100%;
  > img {
    margin-left: 10px;
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
  > h3 {
    width: fit-content;
    margin: 0 32px 0 auto;
  }
`;

export const InputRow = styled.div`
  flex: 1;
  display: flex;
  margin: 20px 0;
  align-items: center;

  > div {
    flex: 1;

    display: flex;
    flex-direction: column;
    & + div {
      margin-left: 14px;
    }
  }
`;

export const ScheduleItem = styled.div`
  display: flex;
  padding: 20px 0;

  > *:not(:first-child) {
    margin-left: 10px;
  }
`;

export const LabelAndInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > label {
    color: ${props => props.theme.inputTextColor};
    font-size: 14px;
  }
`;

export const AlertMessage = styled.div`
  display: flex;
  align-items: center;
  width: 850px;

  > div {
    font-size: 14px;
    margin-left: 12px;
    display: flex;
    flex-direction: column;

    > strong {
      color: ${props => props.theme.purple};
    }

    > span {
      color: ${props => props.theme.complementTextColor};
    }
  }
`;
