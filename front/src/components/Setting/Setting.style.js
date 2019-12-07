import styled from 'styled-components';
import { FlexColumnStyle } from 'components/globalComponents/Container/Flex.style';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const SettingStyle = styled(FlexColumnStyle)`
  width: 50%;
  height: 90%;
  margin: 2rem;
  justify-content: space-around;
  align-items: center;
`;

export const RoomSettingStyle = styled(FlexColumnStyle)`
  width: 100%;
  height: 40%;
`;

export const UserSettingStyle = styled(FlexColumnStyle)`
  width: 100%;
  height: 40%;
`;

export const GameStartButtonStyle = styled(ButtonStyle)`
  width: 80%;
  height: 10%;
  font-size: 22px;
`;
