import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const DoIconStyle = styled(FontAwesomeIcon).attrs({
  size: '1x',
})`
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 10px, rgba(0, 0, 0, 0.16) 0px 2px 5px;
  padding: 0.5rem;
  cursor: pointer;
`;

export const HistoryStyle = styled.div`
  z-index: 1000;
  position: absolute;
  right: 1rem;
  > * {
    margin: 0.2rem;
  }
`;
