import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cogHalfSize = 0.5;

const CogStyle = styled(FontAwesomeIcon)`
  display: block;
  color: ${(props) => props.theme.eastSide};
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -${cogHalfSize}em; //fontawesome에서 em을 사용;
  margin-left: -${cogHalfSize}em;
  transform: translateX(-50%) translateY(-50%);
`;

export default CogStyle;
