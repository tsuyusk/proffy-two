import React from 'react';

import whiteBackArrow from '../../../assets/white-arrow.svg';
import logoImage from '../../../assets/smallLogo.svg';

import { Container, BackArrow, TopBar, HeaderContent } from './styles';

interface CustomisableHeaderProps {
  pageName: string;
  handleGoBack: () => void;
}

const CustomisableHeader: React.FC<CustomisableHeaderProps> = ({
  handleGoBack,
  pageName,
  children,
}) => {
  return (
    <Container>
      <TopBar>
        <BackArrow onClick={handleGoBack}>
          <img src={whiteBackArrow} alt="Left arrow" />
        </BackArrow>
        <span>{pageName}</span>
        <img src={logoImage} alt="Proffy logo" />
      </TopBar>
      <HeaderContent>{children}</HeaderContent>
    </Container>
  );
};

export default CustomisableHeader;
