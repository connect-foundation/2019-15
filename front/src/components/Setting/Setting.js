import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GlobalContext from 'global.context';
import Room from 'logics/room';
import { PRIVATE_ROOM_NAME } from 'constant/room/roomInfo';
import useInput from 'hooks/Input/useInput';
import useCarousel from 'hooks/Carousel/useCarousel';
import { connectGameSocket, emitEnterPrivateRoom } from 'logics/socketLogic';
import AvatarImg from './AvatarImg';
import {
  SettingStyle,
  UserSettingStyle,
  GameStartButtonStyle,
  Nickname,
} from './Setting.style';

export default function Setting() {
  const { setRoom, room, user, gameSocket, setGameSocket } = useContext(
    GlobalContext,
  );
  const history = useHistory();
  const { hash } = useParams();
  const [nickname, onChangeNickname] = useInput('부스트캠퍼');
  const [avatar, clickLeftBtn, clickRightBtn] = useCarousel(3);

  useEffect(() => {
    if (!gameSocket) {
      const socket = connectGameSocket();
      setGameSocket(socket);
    }
    const privateRoomId = hash.slice(1, hash.length);
    setRoom(new Room(privateRoomId, PRIVATE_ROOM_NAME));
  }, [gameSocket, hash, setGameSocket, setRoom]);

  function onClickGameStart() {
    emitEnterPrivateRoom(gameSocket, {
      nickname,
      roomId: room.roomId,
      roomOwner: user.roomOwner,
      avatar,
    });
    history.push(`waiting:${room.roomId}`);
  }

  return (
    <SettingStyle>
      <UserSettingStyle>
        <Nickname />
      </UserSettingStyle>
      <GameStartButtonStyle onClick={onClickGameStart}>
        게임 시작
      </GameStartButtonStyle>
    </SettingStyle>
  );
}
