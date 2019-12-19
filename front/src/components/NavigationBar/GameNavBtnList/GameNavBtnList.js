import React from 'react';
import { useHistory } from 'react-router-dom';
import Text from 'components/NavigationBar/GameNavBtnList/GameNavBtnList.style';

export default function GameNavBtnList() {
  const history = useHistory();
  const moveMain = () => history.replace('/main');
  return <Text onClick={moveMain}>나가기</Text>;
}
