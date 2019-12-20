import styled from 'styled-components';
import { FlexColumnStyle } from 'components/globalComponents/Container/Flex.style';
import ButtonStyle from 'components/globalComponents/Button/Button.style';

export const SettingStyle = styled(FlexColumnStyle)`
  width: 50%;
  height: 90%;
  justify-content: center;
  align-items: center;
  margin: 0 25%;
  max-width: 30rem;
`;

export const RoomSettingStyle = styled(FlexColumnStyle)`
  width: 100%;
  height: 30%;
`;

export const NicknameSettingStyle = styled(FlexColumnStyle)`
  width: 80%;
  height: 20%;
  background-color: ${({ theme }) => theme.paleRose};
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  border: solid 2px white;
  margin-top: 1rem;
  font-size: 28px;
  padding: 1rem 0;
`;

export const AvatarSettingStyle = styled(FlexColumnStyle)`
  width: 80%;
  height: 20%;
  background-color: ${({ theme }) => theme.paleRose};
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  border: solid 2px white;
  font-size: 28px;
  margin: 2rem;
  padding: 1rem 0;
`;

export const GameStartButtonStyle = styled(ButtonStyle)`
  width: 80%;
  height: 10%;
  font-size: 22px;
`;

export const InputWrapper = styled(FlexColumnStyle)`
  width: 80%;
  height: 30%;
  margin-top: 10px;

  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const Nickname = styled.input`
  width: 90%;
  height: 90%;
  font-size: 20px;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  padding: 0px;
  outline: none;
  font-family: 'Cookierun Bold';
  font-style: normal;
  font-weight: normal;
  src: local('CookieRun'), url('./font/CookieRun Bold.otf') format('opentype');
`;
