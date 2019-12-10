import styled from 'styled-components';
import { FlexColumnStyle } from 'components/globalComponents/Container/Flex.style';

export const GameSettingStyle = styled(FlexColumnStyle)`
  width: 20rem;
  min-width: 15rem;
  height: 90%;
  background-color: ${({ theme }) => theme.paleRose};
`;
