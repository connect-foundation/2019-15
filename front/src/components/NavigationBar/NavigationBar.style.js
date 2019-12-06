import styled from 'styled-components';
import Image from '../globalComponents/Image/Image.style';

export const NavigationBarStyle = styled.div`
  display: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4.5rem;
`;

export const LogoImage = styled(Image)`
  margin-top: 5px;
  width: 20rem;
  height: 10rem;
  margin-left: 50%;
  transform: translateX(-50%);
`;

export const SmallLogoImage = styled(Image)`
  margin-top: 5px;
  width: ${() => (window.location.hash === '#/mypage' ? '12rem' : '9rem')};
  height: ${() => (window.location.hash === '#/mypage' ? '5rem' : '3.8rem')};
  margin-left: ${() =>
    window.location.hash === '#/mypage' ? '1rem' : '6.5rem'};
`;
