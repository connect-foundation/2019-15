import styled from 'styled-components';
import { FlexRowStyle } from 'components/globalComponents/Container/Flex.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavImage = styled(FontAwesomeIcon).attrs({
  size: '2x',
})`
  margin-top: 10px;
  margin-right: 1rem;
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
  opacity: 0.8;
  color: black;
`;

export const ButtonContainerStyle = styled.div`
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
