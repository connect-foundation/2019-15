import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/NavigationBar/GameNavBtnContainer/GameNavBtnContainer.style';

export default function GameNavBtnContainer() {
  return (
    <Link to="main">
      <Text>나가기</Text>
    </Link>
  );
}
