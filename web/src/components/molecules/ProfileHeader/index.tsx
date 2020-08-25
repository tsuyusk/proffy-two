import React from 'react';

import signOffIcon from '../../../assets/signOff.svg';
import { Container, UserContainer, SignOffButton } from './styles';

const ProfileHeader: React.FC = () => {
  return (
    <Container>
      <UserContainer>
        <img
          src="https://avatars3.githubusercontent.com/u/53716129?s=460&u=edacca5253ac7c836de527f0abd9d07c5bf72479&v=4"
          alt="User avatar"
        />
        <span>Tiago Luchtenberg</span>
      </UserContainer>
      <SignOffButton>
        <img src={signOffIcon} alt="Sign out" />
      </SignOffButton>
    </Container>
  );
};

export default ProfileHeader;
