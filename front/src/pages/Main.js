import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from 'global.context';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';
import RoomSelectSection from 'components/RoomSelectSection/RoomSelectSection';
import FriendsSection from 'components/FriendsSection/FriendsSection';
import makeModal from 'components/globalComponents/Modal/Modal';
import parseCookies from 'utils/cookie';
import Room from 'utils/catchmymind/Room';
import useGameSocket from 'hooks/Socket/useGameSocket';
import { useHistory } from 'react-router-dom';
import useInitGameSocket from 'hooks/Socket/useInitGameSocket';
import Button from 'components/globalComponents/Button/Button';
import { checkAuth } from 'utils/catchmymind/auth';

const Main = () => {
  const { setGameSocket, setRoom, setIsLogin } = useContext(GlobalContext);
  const [nickName, setNickName] = useState('');
  const [isSignUp, setIsSignUp] = useState(
    parseCookies(document.cookie).isSignUp === 'true',
  );
  const history = useHistory();

  const gameSocket = useInitGameSocket();

  useEffect(() => {
    checkAuth(setNickName, setIsLogin);
    setRoom(null);
    if (gameSocket) gameSocket.emit('exitRoom');
  }, [gameSocket, setIsLogin, setRoom]);

  setGameSocket(gameSocket);

  useGameSocket('connectRandom', ({ roomId }) => {
    setRoom(new Room(roomId));
    history.push('/public');
  });

  const closeModal = () => setIsSignUp(false);
  const Header = () => <h1>환영합니다!</h1>;
  const Body = () => (
    <p>
      안녕하세요, {nickName}님!
      <br />
      다른 유저들과 게임을 하고 싶다면, 공개 방에 입장해주세요.
      <br />
      친구들과 게임을 하고 싶다면, 비밀게임의 방 만들기를 눌러주세요.
      <br />
      닉네임은 마이페이지에서 변경 가능합니다.
      <br />* 친구의 실시간 접속확인, 비밀방에서 친구리스트에서 친구 초대 기능을
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
