import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ComponentStyle = styled.div`
  display: flex;
  width: 7rem;
  height: 1rem;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  font-size: 17px;
  align-items: center;

  > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  > *:first-child {
    flex: 1;
  }
`;

export const Icon = styled(FontAwesomeIcon).attrs({
  size: 'lg',
})`
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;
`;

export const CircleStyle = styled(FontAwesomeIcon).attrs({
  size: '1x',
})`
  margin-right: 0.3rem;
  color: ${(props) => (props.online ? props.theme.eastSide : '#606060')};
`;
