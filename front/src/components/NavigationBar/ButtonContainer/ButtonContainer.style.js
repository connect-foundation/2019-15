import styled from 'styled-components';
import Image from '../../globalComponents/Image/Image.style';
import { FlexRowStyle } from '../../globalComponents/Container/Flex.style';

export const NavImage = styled(Image)`
  margin-top: 10px;
  margin-right: 1rem;
  width: 2.8rem;
  height: 2.8rem;
  cursor: pointer;
  opacity: 0.8;
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
