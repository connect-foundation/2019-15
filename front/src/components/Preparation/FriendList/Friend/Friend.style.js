import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FriendStyle = styled.div`
  width: 12rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin: 1rem;
  border-radius: 10px;
  > * {
    margin: 1rem;
  }
`;

export const PlayIconStyle = styled(FontAwesomeIcon).attrs({
  size: '1x',
})`
  color: ${(props) => props.theme.ecstasy};
`;
