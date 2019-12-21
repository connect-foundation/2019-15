import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const canvasSize = { width: '760px', height: '470px' };

export const WordSet = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  margin: 20%;
`;

export const Background = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  margin-top: 3.5rem;
  margin-left: 0.5rem;
  height: ${canvasSize.height};
  width: ${canvasSize.width};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  border-radius: 0.5rem;
`;

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
