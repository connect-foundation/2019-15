import styled from 'styled-components';
import {
  FlexRowStyle,
  FlexColumnStyle,
} from 'components/globalComponents/Container/Flex.style';

export const UserStyle = styled(FlexRowStyle)`
  width: 14rem;
  height: 5.5rem;
  margin: 0.3rem;
  margin-bottom: 0.6rem;
  background-color: ${(props) => props.theme.surfCrest};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 0.3rem;

  &.you {
    border: 3px solid ${({ theme }) => theme.slateGray};
  }
`;

export const UserInfoStyle = styled(FlexColumnStyle)`
  padding-left: 1rem;
`;

export const UserImage = styled.img`
  margin-left: 5px;
  width: 5rem;
  height: 5rem;
  min-width: 5rem;
  min-height: 5rem;
  border-radius: 0.3rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const Ranking = styled.span`
  font-size: 15px;
  font-weight: 820;
  margin-right: 10px;
`;

export const UserNickName = styled.div``;

export const Text = styled.span`
  font-size: 15px;
  font-weight: 680;
  color: ${(props) => props.theme.slateGray};
`;
export const Drawer = styled.img`
  display: ${({ drawer }) => (drawer ? 'span' : 'none')};
  width: 20px;
  height: 20px;
  margin-left: 10px;
`;

export const Score = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: ${(props) => props.theme.stormBrain};
`;
