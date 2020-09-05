import React, { useCallback } from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';
import { Container, UserContainer, SignOffButton } from './styles';

const ProfileHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const history = useHistory();
  const handleGoToProfile = useCallback(() => {
    history.push('/me');
  }, [history]);
  return (
    <Container>
      <UserContainer onClick={handleGoToProfile}>
        {user.avatar_url ? (
          <img src={user.avatar_url} alt={user.name} />
        ) : (
          <img
            src="https://image.flaticon.com/icons/png/512/0/14.png"
            alt="Black circle"
          />
        )}
        <span>
          {user.name} {user.lastName}
        </span>
      </UserContainer>
      <SignOffButton onClick={signOut}>
        <FiPower size={20} />
      </SignOffButton>
    </Container>
  );
};

export default ProfileHeader;
