import styled from 'styled-components';

export const Container = styled.div``;

export const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
  > h1 {
    width: 350px;
    color: ${props => props.theme.titleInPurple};
    font-size: 36px;
    align-self: start;
  }
`;

export const LabelAndInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  > label {
    color: ${props => props.theme.inputTextColor};
    font-size: 14px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 740px;
  margin: 0 auto;
`;
