import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WordCard = styled.div`
  display: table;
  border: 1px solid lightgray;
  min-width: 4rem;
  height: 3rem;
  background-color: white;
  border-radius: 1rem;
  cursor: pointer;
  z-index: 1;
`;

export const P = styled.p`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`;

export const Icon = styled(FontAwesomeIcon).attrs({
  size: 'lg',
})`
  margin-left: 1rem;
`;

export const Div = styled.div`
  display: flex;
  position: absolute;
  bottom: 1rem;
  cursor: pointer;
`;
