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
  height: 100%;
  float: right;
`;

export const Text = styled(FlexRowStyle)`
  font-size: 32px;
  padding-top: 10px;
  padding-right: 30px;
  cursor: pointer;
`;
