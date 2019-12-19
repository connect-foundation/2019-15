import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GlobalContext from 'global.context';
import Room from 'logics/room';
import { PRIVATE_ROOM_NAME } from 'constant/room/roomInfo';
import useCarousel from 'hooks/Carousel/useCarousel';
import AVATAR_NUMBER from 'constant/avatar';
import useInputByReducer from 'hooks/Input/useInputByReducer';
import { SettingStyle, GameStartButtonStyle } from './Setting.style';
import NicknameContainer from './NicknameContainer';
import AvatarContainer from './AvatarContainer';

export default function Setting() {
  const { setRoom, room, gameSocket } = useContext(GlobalContext);
  const history = useHistory();
  const { hash } = useParams();
  const [avatar, clickLeftBtn, clickRightBtn] = useCarousel(AVATAR_NUMBER);
  const [nickname, onChangeNickname] = useInputByReducer();

  useEffect(() => {
    const privateRoomId = hash.slice(1, hash.length);
    setRoom(new Room(privateRoomId, PRIVATE_ROOM_NAME));

    if (!gameSocket) return;
    gameSocket.emit('exitRoom', {
      roomType: PRIVATE_ROOM_NAME,
      roomId: privateRoomId,
    });
  }, [gameSocket, hash, setRoom]);

  const onClickGameStart = () => {
    gameSocket.emit('enterPrivate', {
      nickname: nickname.nickname,
      roomId: room.roomId,
      avatar,
    });
    history.replace(`/waiting:${room.roomId}`);
  };

  return (
    <SettingStyle>
      <NicknameContainer onChangeNickname={onChangeNickname} />
      <AvatarContainer
        avatar={avatar}
        clickLeftBtn={clickLeftBtn}
        clickRightBtn={clickRightBtn}
      />
      <GameStartButtonStyle onClick={onClickGameStart}>
        게임 시작
      </GameStartButtonStyle>
    </SettingStyle>
  );
}
