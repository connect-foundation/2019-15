import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import NavigationBar from '../../components/NavigationBar/NavigationBar';
import GameInfo from '../../components/GameInfo/GameInfo';
import { FlexRowStyle } from '../../components/globalComponents/Container/Flex.style';
import GlobalContext from '../../global.context';
import UserList from '../../components/Userlist/Userlist';
import CanvasSection from '../../components/CanvasSection/CanvasSection';
import Chatting from '../../components/Chatting/Chatting';
import GamePlayContext from './GamePlay.context';
import GameLoading from '../../components/GameLoading/GameLoading';
import Timer from '../../components/Timer/Timer';

const GamePlay = () => {
  const { io, room } = useContext(GlobalContext);
  const [userList, setUserList] = useState([]);
  const [painter, setPainter] = useState(null);

  useEffect(() => {
    const initSocket = async () => {
      if (io.socket) {
        await io.initUserlistMsgHandler({ setUserList });
        await io.initGameStartMsgHandler({ setPainter });
      }
    };
    initSocket();
  }, [io]);

  if (io.socket === null) {
    return <Redirect to="main" />;
  }

  return (
    <GamePlayContext.Provider value={{ userList, painter, setPainter }}>
      <GameLoading />
      <NavigationBar visible={room.roomType} />
      <GameInfo />
      <>
        <FlexRowStyle>
          <UserList />
          <div>
            <Timer />
            <CanvasSection />
          </div>
          <Chatting />
        </FlexRowStyle>
      </>
    </GamePlayContext.Provider>
  );
};

export default GamePlay;
