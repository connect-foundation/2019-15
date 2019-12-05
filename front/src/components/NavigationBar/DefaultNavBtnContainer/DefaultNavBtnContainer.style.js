import styled from 'styled-components';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavImageStyle = styled(FontAwesomeIcon).attrs({
  size: '3x',
})`
  margin-top: 10px;
  margin-right: 1.5rem;
  cursor: pointer;
  opacity: 0.8;
  color: black;
`;

export const NavBtnContainerStyle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export const Text = styled(FlexRowStyle)`
  color: black;
  width: 7rem;
  margin-top: -3rem;
  margin-left: 83.5rem;
  font-size: 32px;
  cursor: pointer;
`;
