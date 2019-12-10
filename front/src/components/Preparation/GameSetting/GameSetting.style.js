import styled from 'styled-components';
import { FlexColumnStyle } from 'components/globalComponents/Container/Flex.style';

export const GameSettingStyle = styled(FlexColumnStyle)`
  width: 30%;
  height: 90%;
  background-color: ${({ theme }) => theme.paleRose};
`;
