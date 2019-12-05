import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavBtnContainerStyle,
  Text,
} from 'components/NavigationBar/DefaultNavBtnContainer/DefaultNavBtnContainer.style';

export default function GameNavBtnContainer() {
  return (
    <Link to="main">
      <NavBtnContainerStyle>
        <Text>나가기</Text>
      </NavBtnContainerStyle>
    </Link>
  );
}
