import styled from 'styled-components';

import ButtonFromAtoms from '../../components/atoms/Button';
import backgroundImage from '../../assets/proffy-bg.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.purple};
  background-image: url(${backgroundImage});
  background-size: contain;
  background-position: center;

  > h1 {
    margin: 20px 0;
    color: ${props => props.theme.titleInPurple};
    font-size: 54px;
  }

  > p {
    max-width: 350px;
    text-align: center;
    color: ${props => props.theme.baseTextColorInPurple};
  }
`;

export const Button = styled(ButtonFromAtoms)`
  width: 200px;
  height: 55px;
  margin-top: 30px;
`;
