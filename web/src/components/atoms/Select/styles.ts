import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border-radius: 8px;
  height: 64px;
  flex: 1;

  > label {
    font-size: 14px;
  }

  > select {
    border-radius: 8px;
    background: ${props => props.theme.shape2};
    border: 1px solid ${props => props.theme.linesInWhite};
    width: 100%;
    height: 56px;
    font-size: 16px;
    padding: 0 16px;
  }
`;
