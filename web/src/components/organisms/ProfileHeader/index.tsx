import React, { useCallback } from 'react';

import { FiPower } from 'react-icons/fi';
import { Container, UserContainer, SignOffButton } from './styles';
import { useHistory } from 'react-router-dom';

const ProfileHeader: React.FC = () => {
  const history = useHistory();
  const handleGoToProfile = useCallback(() => {
    history.push('/me');
  }, [history]);
  return (
    <Container>
      <UserContainer onClick={handleGoToProfile}>
        <img
          src="https://avatars3.githubusercontent.com/u/53716129?s=460&u=edacca5253ac7c836de527f0abd9d07c5bf72479&v=4"
          alt="User avatar"
        />
        <span>Tiago Luchtenberg</span>
      </UserContainer>
      <SignOffButton>
        <FiPower size={20} />
      </SignOffButton>
    </Container>
  );
};

export default ProfileHeader;
