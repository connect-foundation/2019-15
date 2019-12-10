import styled from 'styled-components';
import {
  FlexRowStyle,
  FlexColumnStyle,
} from 'components/globalComponents/Container/Flex.style';

export const UserListStyle = styled(FlexRowStyle)`
  min-width: 20rem;
  height: 90%;
  margin-left: 2rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  background-color: ${({ theme }) => theme.paleRose};
`;

export const UserStyle = styled(FlexColumnStyle)`
  width: 100px;
  height: 130px;
  max-height: 130px;
  margin-left: 5px;
  margin-top: 5px;
  align-items: center;
  justify-content: flex-start;
`;

export const Avatar = styled.img`
  width: 90px;
  height: 90px;
`;

export const RoomOwner = styled.img`
  width: 20px;
  height: 16px;
  top: 20px;
  left: 30px;
`;

export const Text = styled.div`
  width: 100px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  img {
    display: ${({ roomOwner }) => (roomOwner ? 'inline' : 'none')};
  }
`;
