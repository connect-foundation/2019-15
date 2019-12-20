import styled from 'styled-components';
import { FlexColumnStyle } from 'components/globalComponents/Container/Flex.style';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const GameSettingStyle = styled(FlexColumnStyle)`
  width: 15rem;
  height: 29rem;
  background-color: ${({ theme }) => theme.paleRose};
  align-items: center;
  justify-content: center;
  margin-top: 6rem;
  border-radius: 1rem;
  border: solid 2px white;
  padding: 1rem 0;
`;

export const StartBtn = styled(ButtonStyle)`
  width: 80%;
  height: 3rem;
  font-size: 20px;

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;
