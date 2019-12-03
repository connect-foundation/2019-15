import styled from 'styled-components';
import Button from 'components/globalComponents/Button/Button.style';

export const PublicRoomButton = styled(Button)`
  white-space: nowrap;
  width: 8.5rem;
  height: 5rem;
  font-size: 2.5rem;
  margin: 0.7rem;
  @media (max-width: 700px) {
    margin: 0.3rem;
    width: 8.5rem;
    height: 3rem;
    font-size: 30px;
  }
`;

export const CustomA = styled.a``;
