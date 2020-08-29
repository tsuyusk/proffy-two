import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  > label {
    font-size: 14px;
    > span {
      color: ${props => props.theme.inputTextColor};
      font-size: 12px;

      &::before {
        content: ' ';
      }
    }
  }

  > textarea {
    resize: vertical;

    width: 100%;
    background: ${props => props.theme.shape2};
    border: 1px solid ${props => props.theme.linesInWhite};
    min-height: 130px;
  }
`;
