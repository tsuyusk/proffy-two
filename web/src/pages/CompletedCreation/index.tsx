import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import checkedCheckboxIcon from '../../assets/checkedCheckboxIcon.svg';
import { Container, Button } from './styles';

const CompletedCreation: React.FC = () => {
  const history = useHistory();

  const handleGoToLanding = useCallback(() => {
    history.push('/landing');
  }, [history]);

  return (
    <Container>
      <img src={checkedCheckboxIcon} alt="Checked checkbox" />
      <h1>Cadastro salvo!</h1>
      <p>
        Tudo certo, seu cadastro está na nossa lista de professores. Agora é só
        ficar de olho no seu WhatsApp.
      </p>
      <Button onClick={handleGoToLanding}>Acessar</Button>
    </Container>
  );
};

export default CompletedCreation;
