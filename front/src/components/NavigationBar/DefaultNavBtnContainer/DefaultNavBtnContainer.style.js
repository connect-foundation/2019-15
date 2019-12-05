import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavImageStyle = styled(FontAwesomeIcon).attrs({
  size: '3x',
})`
  margin-top: 10px;
  margin-right: 1.5rem;
  cursor: pointer;
  opacity: 0.8;
  color: black;
  @media (max-width: 700px) {
    margin-right: 0.5rem;
  }
`;

export const NavBtnContainerStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
