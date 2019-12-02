import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import checkAuth from 'logics/auth/checkAuth';
import { connectSocket } from 'logics/socketLogic/online';
import Room from 'logics/room';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';
import RoomSelectSection from 'components/RoomSelectSection/RoomSelectSection';
import FriendsSection from 'components/FriendsSection/FriendsSection';
import Modal from 'components/globalComponents/Modal/Modal';
import DivStyle from 'components/globalComponents/Modal/ContentDiv.style';
import Button from 'components/globalComponents/Button/Button';
import parseCookies from 'util/cookie';

const Main = () => {
  const { setOnlineSocket, io, setRoom, userDispatch } = useContext(
    GlobalContext,
  );
  const [nickName, setNickName] = useState('');
  const [isSignUp, setIsSignUp] = useState(
    parseCookies(document.cookie).isSignUp === 'true',
  );

  useEffect(() => {
    const initSocket = async () => {
      await io.connectSocket();
      const socket = await connectSocket();
      await io.initConnectMsgHandler({ setRoom });
      setOnlineSocket(socket);
      setRoom(new Room());
    };
    checkAuth(setNickName);
    initSocket();
  }, [io, setOnlineSocket, setRoom, userDispatch]);

  function closeModal() {
    setIsSignUp(false);
  }

  return (
    <>
      {isSignUp ? (
        <Modal>
          <DivStyle>
            <div>
              당신의 닉네임은 <strong>{nickName}</strong>입니다.
            </div>
            <div>
              <Button onClick={closeModal}>확인</Button>
            </div>
          </DivStyle>
        </Modal>
      ) : null}
      <NavigationBar />
      <Background id="MainPage">
        <RoomSelectSection />
        <FriendsSection />
      </Background>
    </>
  );
};

export default Main;
