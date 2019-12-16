import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/NavigationBar/GameNavBtnList/GameNavBtnList.style';

export default function GameNavBtnList() {
  return (
    <Link to="main">
      <Text>나가기</Text>
    </Link>
  );
}
