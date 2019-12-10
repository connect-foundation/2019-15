import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../globalComponents/Button/Button.style';

export const PublicRoomButton = styled(Button)`
  white-space: nowrap;
  width: 8.5rem;
  height: 5rem;
  font-size: 2.5rem;
  margin: 0.7rem;

  @media (max-width: 700px) {
    width: 8.5rem;
    height: 3rem;
    font-size: 30px;
    margin: 0.3rem;
  }
`;
