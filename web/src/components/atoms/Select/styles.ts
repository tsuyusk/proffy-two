import styled from 'styled-components';

interface ContainerProps {
  labelColor: string | undefined;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  border-radius: 8px;
  height: 64px;
  flex: 1;

  > label {
    color: ${props => (props.labelColor ? props.labelColor : 'auto')};
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
