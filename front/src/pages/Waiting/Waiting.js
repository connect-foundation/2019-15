import React, { useEffect, useContext, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Preparation from 'components/Preparation/Preparation';
import { initUserListMsgHandler, closeSocket } from 'logics/socketLogic';
import GlobalSocket from 'global.context';
import NavigationBar from 'components/NavigationBar/NavigationBar';

export default function Waiting() {
  const { gameSocket, setGameSocket, room } = useContext(GlobalSocket);
  const [userList, setUserList] = useState([]);
  const { hash } = useParams();
  useEffect(() => {
    if (!gameSocket) return () => {};
    initUserListMsgHandler(gameSocket, { setUserList });

    return () => {
      closeSocket(gameSocket, { setGameSocket });
    };
  }, [gameSocket, setGameSocket]);

  if (!gameSocket || gameSocket.disconnected) {
    return <Redirect to={`setting${hash}`} />;
  }

  return (
    <>
      <NavigationBar />
      <Preparation waitingUserList={userList} />
    </>
  );
}
