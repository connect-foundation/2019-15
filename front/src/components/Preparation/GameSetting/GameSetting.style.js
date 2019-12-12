import styled from 'styled-components';
import { FlexColumnStyle } from 'components/globalComponents/Container/Flex.style';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const GameSettingStyle = styled(FlexColumnStyle)`
  width: 15rem;
  height: 35rem;
  background-color: ${({ theme }) => theme.paleRose};
  align-items: center;
  justify-content: center;
`;

export const StartBtn = styled(ButtonStyle)`
  width: 80%;
  height: 3rem;
  font-size: 20px;

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;
