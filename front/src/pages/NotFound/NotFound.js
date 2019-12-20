import React from 'react';
import Background from 'components/globalComponents/Container/Background.style';
import NotFoundImage from '../../asset/not_found_image.png';
import NotFoundStyle from './NotFound.style';

export default function NotFound() {
  return (
    <Background>
      <NotFoundStyle>
        <img src={NotFoundImage} alt="404 not found" />
        <h1>페이지를 찾을 수 없어요...</h1>
      </NotFoundStyle>
    </Background>
  );
}
