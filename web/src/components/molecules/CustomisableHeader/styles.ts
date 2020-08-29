import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  padding: 0 0 16px;
  height: fit-content;
  background: ${props => props.theme.purple};
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${props => props.theme.baseTextColorInPurple};
  background: ${props => props.theme.littlePurple};
  padding: 10px 0;

  > img {
    width: 50px;
    height: 15px;
  }
`;

export const BackArrow = styled.button`
  background: transparent;
  border: 0;
  transition: transform 0.3s ease-out;
  > img {
    color: #fff;
  }
  &:hover {
    transform: translateX(-10px);
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 35px 35px 30px 0;

  color: ${props => props.theme.titleColor};
`;
