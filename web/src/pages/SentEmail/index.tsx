import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import checkedCheckboxIcon from '../../assets/checkedCheckboxIcon.svg';
import { Container, Button } from './styles';

const SentEmail: React.FC = () => {
  const history = useHistory();

  const handleGoToLogin = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Container>
      <img src={checkedCheckboxIcon} alt="Checked checkbox" />
      <h1>Redefinição enviada!</h1>
      <p>
        Boa, agora é só checar o e-mail que foi enviado para você redefinir sua
        senha e aproveitar os estudos.
      </p>
      <Button onClick={handleGoToLogin}>Voltar ao login</Button>
    </Container>
  );
};

export default SentEmail;
