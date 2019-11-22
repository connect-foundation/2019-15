import React, { useContext, useState, useEffect } from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import GameInfo from "../../components/GameInfo/GameInfo";
import { FlexRowStyle } from "../../components/globalComponents/Container/Flex.style";
import GlobalContext from "../../global.context";
import Userlist from "../../components/Userlist/Userlist";
import Canvas from "../../components/Canvas/Canvas";
import Chatting from "../../components/Chatting/Chatting";
import BackGroundStyle from "../../components/RoomSelectSection/BackGroundStyle.style";
import GamePlayContext from "./GamePlay.context";
import GameLoading from "../../components/GameLoading/GameLoading";

const GamePlay = () => {
  // 게임플레이 페이지에서 필요한 상태와 전역 상태인 io room 가져옴
  const { io, room } = useContext(GlobalContext);
  const [userlist, setUserlist] = useState([]);
  const [painter, setPainter] = useState(null);

  // 소켓에 이벤트 등록
  useEffect(() => {
    const initSocket = async () => {
      await io.initUserlistMsgHandler({ setUserlist });
      await io.initGameStartMsgHandler({ setPainter });
    };
    initSocket();
  }, [io]);

  return (
    <GamePlayContext.Provider value={{ userlist, painter, setPainter }}>
      <GameLoading />
      <NavigationBar visible={room.roomType} />
      <GameInfo />
      <BackGroundStyle>
        <FlexRowStyle>
          <Userlist />
          <Canvas />
          <Chatting />
        </FlexRowStyle>
      </BackGroundStyle>
    </GamePlayContext.Provider>
  );
};

export default GamePlay;
