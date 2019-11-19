import React, { useEffect, useContext } from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import RoomSelectSection from '../../components/RoomSelectSection/RoomSelectSection';
import FriendsSection from '../../components/FriendsSection/FriendsSection';
import MainContext from '../../Main.context';
import checkAuth from '../../logics/checkAuth';
import Loading from '../../components/globalComponents/Loading/Loading';

const Main = () => {
  const { io, userlist, setUserlist, room, setRoom } = useContext(MainContext);

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      await io.initMsgHandler({ setUserlist, setRoom });
    };
    checkAuth();
    initSocket();
  }, [io, setRoom, setUserlist]);

  // 메인 화면
  if (room.roomType === null) {
    return (
      <>
        <NavigationBar />
        <RoomSelectSection />
        <FriendsSection />
      </>
    );
  }

  // 혼자일 경우 게임 대기
  if (userlist.length <= 1) {
    return <Loading />;
  }

  // 게임 화면
  return <>게임중이시네요</>;
};

export default Main;
