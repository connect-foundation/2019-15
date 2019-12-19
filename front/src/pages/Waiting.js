import React, { useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Preparation from 'components/Preparation/Preparation';
import GlobalSocket from 'global.context';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import useGameSocket from 'hooks/Socket/useGameSocket';

export default function Waiting() {
  const { gameSocket } = useContext(GlobalSocket);
  const [userList, setUserList] = useState([]);
  const { hash } = useParams();
  const history = useHistory();
  const [roomOwner, setRoomOwner] = useState(false);

  useGameSocket('userList', ({ playerList }) => {
    const parsedList = JSON.parse(playerList);
    setUserList(parsedList);
  });

  useGameSocket('movePrivate', () => {
    history.replace(`/private${hash}`);
  });

  useGameSocket('roomOwner', () => {
    setRoomOwner(true);
  });

  if (!gameSocket) {
    history.replace(`/setting${hash}`);
    return <></>;
  }

  return (
    <>
      <NavigationBar />
      <Preparation waitingUserList={userList} roomOwner={roomOwner} />
    </>
  );
}
