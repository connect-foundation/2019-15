import styled from 'styled-components';
import Image from '../globalComponents/Image/Image.style';

export const NavigationBarStyle = styled.div`
  display: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
    // background-color: ${(props) => props.theme.pink};
`;

export const LogoImage = styled(Image)`
  margin-top: 5px;
  width: 20rem;
  height: 10rem;
  margin-left: 50%;
  transform: translateX(-50%);
`;
