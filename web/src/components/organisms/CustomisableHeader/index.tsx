import React, { useCallback } from 'react';

import whiteBackArrow from '../../../assets/white-arrow.svg';
import logoImage from '../../../assets/smallLogo.svg';

import {
  Container,
  BackArrow,
  TopBar,
  HeaderContent,
  LogoButton,
} from './styles';
import { useHistory } from 'react-router-dom';

interface CustomisableHeaderProps {
  pageName: string;
  handleGoBack: () => void;
}

const CustomisableHeader: React.FC<CustomisableHeaderProps> = ({
  handleGoBack,
  pageName,
  children,
}) => {
  const history = useHistory();
  const handleGoToLanding = useCallback(() => {
    history.push('/landing');
  }, [history]);
  return (
    <Container>
      <TopBar>
        <BackArrow onClick={handleGoBack}>
          <img src={whiteBackArrow} alt="Left arrow" />
        </BackArrow>
        <span>{pageName}</span>
        <LogoButton onClick={handleGoToLanding}>
          <img src={logoImage} alt="Proffy logo" />
        </LogoButton>
      </TopBar>
      <HeaderContent>{children}</HeaderContent>
    </Container>
  );
};

export default CustomisableHeader;
