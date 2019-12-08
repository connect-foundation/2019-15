import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const IconStyle = styled(FontAwesomeIcon).attrs({
  size: 'lg',
})`
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;
`;

export const CircleStyle = styled(FontAwesomeIcon).attrs({
  size: '1x',
})`
  margin-right: 1rem;
  color: ${(props) => props.theme.eastSide};
`;
