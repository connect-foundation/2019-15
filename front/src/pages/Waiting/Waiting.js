import React, { useEffect, useContext, useState } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import Preparation from 'components/Preparation/Preparation';
import {
  initUserListMsgHandler,
  initMovePrivateGame,
  initSetRoomOwner,
} from 'logics/socketLogic';
import GlobalSocket from 'global.context';
import NavigationBar from 'components/NavigationBar/NavigationBar';

export default function Waiting() {
  const { gameSocket, setGameSocket } = useContext(GlobalSocket);
  const [userList, setUserList] = useState([]);
  const { hash } = useParams();
  const history = useHistory();
  const [roomOwner, setRoomOwner] = useState(false);

  useEffect(() => {
    if (!gameSocket) return;
    initUserListMsgHandler(gameSocket, { setUserList });
    initMovePrivateGame(gameSocket, () => {
      history.push(`private${hash}`);
    });
    initSetRoomOwner(gameSocket, { setRoomOwner });
  }, [gameSocket, hash, history, setGameSocket]);

  if (!gameSocket || gameSocket.disconnected) {
    return <Redirect to={`setting${hash}`} />;
  }

  return (
    <>
      <NavigationBar />
      <Preparation waitingUserList={userList} roomOwner={roomOwner} />
    </>
  );
}
