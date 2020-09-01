import styled, { css } from 'styled-components';

import AtomButton from '../../atoms/Button';

export const Container = styled.div`
  background: ${props => props.theme.shape};
  padding: 44px 32px;
  border: 1px solid ${props => props.theme.linesInWhite};
  border-radius: 8px;
  margin-top: 40px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 44px;

  > img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;

    margin-left: 24px;

    > strong {
      font-size: 24px;
      margin-bottom: 8px;
    }

    > span {
      font-size: 16px;
    }
  }
`;

export const Description = styled.p`
  line-height: 26px;
  font-size: 16px;
`;

export const ScheduleContainer = styled.div`
  display: flex;
  margin: 10px 0;
  overflow-x: auto;
`;

interface ScheduleItem {
  disabled: boolean;
}

export const ScheduleItem = styled.div<ScheduleItem>`
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.shape2};
  border-radius: 8px;
  padding: 16px 24px;
  flex: 1;

  & + div {
    margin-left: 16px;
  }

  ${props =>
    props.disabled &&
    css`
      opacity: 0.2;
    `}

  > span {
    font-size: 12px;
    line-height: 20px;
    color: ${props => props.theme.complementTextColor};
  }

  > strong {
    margin-bottom: 16px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${props => props.theme.shape2};
  border-radius: 0 0 8px 8px;
  margin-top: 1px solid ${props => props.theme.linesInWhite};
  padding: 15px 0;

  > div {
    width: 177px;

    > span {
      color: ${props => props.theme.complementTextColor};
      font-size: 14px;
      line-height: 20px;

      &::after {
        content: ' ';
      }
    }
    > strong {
      color: ${props => props.theme.purple};
      font-size: 20px;
    }
  }
`;

export const Button = styled(AtomButton)`
  width: 250px;
`;
