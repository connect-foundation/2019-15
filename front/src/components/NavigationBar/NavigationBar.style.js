import styled from 'styled-components';
import Image from '../globalComponents/Image/Image.style';

export const NavigationBarStyle = styled.div`
  display: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: ${(props) => props.theme.slateGray};
`;

export const LogoImage = styled(Image)`
  margin-top: 5px;
  width: 12rem;
  height: 3.3rem;
`;
