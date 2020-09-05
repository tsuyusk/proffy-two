import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';
import { shade } from 'polished';

import proffyBg from '../../assets/background-proffy.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
  height: 100vh;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  background: url(${proffyBg});
  background-size: contain;
  background-position: center;
`;

export const UserProfile = styled.div`
  position: relative;

  > img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
  }

  > input {
    display: none;
  }
`;

export const UploadButton = styled.label`
  position: absolute;
  right: -10px;
  bottom: -10px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.green};
  cursor: pointer;
  transition: background 0.3s ease-out;
  &:hover {
    background: ${props => shade(0.2, props.theme.green)};
  }

  > div {
    margin: auto;
  }
`;

export const Form = styled(UnformForm)`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.shape};
  border-radius: 8px;
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

export const RemoveButton = styled.button`
  margin: 0 auto;
  padding: 4px;
  color: ${props => props.theme.redDelete};
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
