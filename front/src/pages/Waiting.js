import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Preparation from 'components/Preparation/Preparation';
import GlobalSocket from 'global.context';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import useGameSocket from 'hooks/Socket/useGameSocket';

export default function Waiting() {
  const { gameSocket, isLogin } = useContext(GlobalSocket);
  const [userList, setUserList] = useState([]);
  const [isRoomOwner, setIsRoomOwner] = useState(false);

  const { hash } = useParams();
  const history = useHistory();

  const moveHome = () => {
    history.replace('/');
  };

  useGameSocket('userList', ({ playerList }) => {
    const parsedList = JSON.parse(playerList);
    setUserList(parsedList);
  });

  useGameSocket('movePrivate', () => {
    history.replace(`/private${hash}`);
  });

  useGameSocket('roomOwner', () => {
    setIsRoomOwner(true);
  });

  if (!isLogin) {
    moveHome();
    return <></>;
  }

  if (!gameSocket) {
    history.replace(`/setting${hash}`);
    return <></>;
  }

  return (
    <>
      <NavigationBar />
      <Preparation waitingUserList={userList} isRoomOwner={isRoomOwner} />
    </>
  );
}
