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
  width: 25rem;
  height: 13rem;
  margin-left: 50%;
  margin-top: 3rem;
  transform: translateX(-50%);
  cursor: pointer;
`;

export const SmallLogoImage = styled(Image)`
  margin-top: 5px;
  cursor: pointer;
  ${(props) =>
    props.pathname.includes('mypage')
      ? `
      width : 12rem;
      height: 5rem;
      margin-left: 1rem;
      `
      : `
      width : 9rem;
      height: 3.8rem;
      margin-left: 6.5rem;
      `}
`;
