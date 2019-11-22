import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const CogStyle = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.eastSide};
  transform: translateX(-50%) translateY(-50%);
`;

export const LoadingStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
