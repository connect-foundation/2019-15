import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WordCard = styled.div`
  display: table;
  border: 1px solid lightgray;
  min-width: 6rem;
  height: 3.5rem;
  background-color: white;
  border-radius: 1rem;
  cursor: pointer;
  z-index: 1;
`;

export const P = styled.p`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
`;

export const Icon = styled(FontAwesomeIcon).attrs({
  size: 'lg',
})`
  margin-left: 0.2rem;
`;

export const Div = styled.div`
  display: flex;
  position: absolute;
  top: 7rem;
  font-size: 1.5rem;
`;

export const Button = styled.div`
  display: flex;
  margin-left: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${(props) => props.theme.pink};
  padding: 0.3rem;
  padding-bottom: 0;
  :hover {
    background-color: ${(props) => props.theme.seaPink};
  }
`;
