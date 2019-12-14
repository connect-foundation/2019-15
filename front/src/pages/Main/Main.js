import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import checkAuth from 'logics/auth/checkAuth';
import { connectSocket } from 'logics/socketLogic/online';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';
import RoomSelectSection from 'components/RoomSelectSection/RoomSelectSection';
import FriendsSection from 'components/FriendsSection/refactor/FriendsSection';
import makeModal from 'components/globalComponents/Modal/Modal';
import parseCookies from 'util/cookie';
import { connectGameSocket, initConnectMsgHandler } from 'logics/socketLogic';
import Button from '../../components/globalComponents/Button/Button';

const Main = () => {
  const { setOnlineSocket, setGameSocket, setRoom, userDispatch } = useContext(
    GlobalContext,
  );
  const [nickName, setNickName] = useState('');
  const [isSignUp, setIsSignUp] = useState(
    parseCookies(document.cookie).isSignUp === 'true',
  );

  useEffect(() => {
    const initSocket = () => {
      const onlineSocket = connectSocket();
      setOnlineSocket(onlineSocket);

      const gameSocket = connectGameSocket();
      setGameSocket(gameSocket);
      initConnectMsgHandler(gameSocket, { setRoom });
      setRoom(null);
    };
    checkAuth(setNickName);
    initSocket();
  }, [setGameSocket, setOnlineSocket, setRoom, userDispatch]);

  function closeModal() {
    setIsSignUp(false);
  }
  const Header = () => <h1>환영합니다!</h1>;
  const Body = () => (
    <p>
      안녕하세요, {nickName}님!
      <br />
      다른 유저들과 게임을 하고 싶다면, 공개 방에 입장해주세요.
      <br />
      친구들과 게임을 하고 싶다면, 비밀게임의 방 만들기를 눌러주세요.
      <br />
      친구의 실시간 접속확인, 비밀방에서 친구리스트에서 친구 초대 기능을
      사용해보세요!
    </p>
  );
  const Footer = () => <Button onClick={closeModal}>확인</Button>;

  const Modal = makeModal(Header, Body, Footer);

  return (
    <>
      {isSignUp ? <Modal /> : null}
      <NavigationBar />
      <Background id="MainPage">
        <RoomSelectSection />
        <FriendsSection />
      </Background>
    </>
  );
};

export default Main;
