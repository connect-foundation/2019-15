import styled from 'styled-components';
import {
  FlexRowStyle,
  FlexColumnStyle,
} from '../../globalComponents/Container/Flex.style';

export const UserStyle = styled(FlexRowStyle)`
  width: 16rem;
  height: 7rem;
  margin: 0.3rem;
  background-color: ${(props) => props.theme.surfCrest};
`;

export const UserInfoStyle = styled(FlexColumnStyle)`
  padding-left: 1rem;
`;

export const UserImage = styled.img`
  margin-left: 5px;
  width: 180px;
  height: 100px;
`;

export const Ranking = styled.span`
  font-size: 32px;
  font-weight: 820;
  margin-right: 10px;
`;

export const UserNickName = styled.div``;

export const Text = styled.span`
  font-size: 28px;
  font-weight: 680;
`;
export const Drawer = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

export const Score = styled.div``;
