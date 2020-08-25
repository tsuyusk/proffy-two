import styled from 'styled-components';
import ButtonFromAtoms from '../../components/atoms/Button';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.purple};
`;

export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 10px;
  padding: 25px 0;
`;

export const LogoContainer = styled.div``;

export const HeroContainer = styled.div``;

export const WhiteBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  background: ${props => props.theme.background};
  width: 100%;
  height: 287px;
`;

export const GreetingsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  font-size: 18px;

  > p {
    width: 220px;
    > strong {
      display: block;
    }
  }

  > span {
    width: 134px;
    font-size: 12px;
    text-align: right;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 400px;
`;

interface ButtonProps {
  backgroundColor: string;
}

export const Button = styled(ButtonFromAtoms)<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: ${props => props.backgroundColor};
  padding: 25px 0;
  width: 250px;
  height: 72px;

  & + button {
    margin-left: 16px;
  }

  &:hover {
    background: ${props => shade(0.2, props.backgroundColor)};
  }
`;
