import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { FiXCircle } from 'react-icons/fi';
import { Container, Button } from './styles';

const Error404: React.FC = () => {
  const history = useHistory();

  const handleGoToLanding = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Container>
      <FiXCircle size={100} color="#aa2211" />
      <h1>Página não encontrada!</h1>
      <p>
        Não achamos a página que você está procurando, mas você pode voltar
        apertando o botão abaixo.
      </p>
      <Button onClick={handleGoToLanding}>Voltar</Button>
    </Container>
  );
};

export default Error404;
