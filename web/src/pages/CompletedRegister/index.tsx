import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import checkedCheckboxIcon from '../../assets/checkedCheckboxIcon.svg';
import { Container, Button } from './styles';

const CompletedRegister: React.FC = () => {
  const history = useHistory();

  const handleGoToLogin = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Container>
      <img src={checkedCheckboxIcon} alt="Checked checkbox" />
      <h1>Cadastro concluído</h1>
      <p>
        Agora você faz parte da plataforma da Proffy. Tenha uma ótima
        experiência.
      </p>
      <Button onClick={handleGoToLogin}>Fazer login</Button>
    </Container>
  );
};

export default CompletedRegister;
