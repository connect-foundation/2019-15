import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import GlobalContext from 'global.context';
import Room from 'logics/room';
import { PRIVATE_ROOM_NAME } from 'constant/room/roomInfo';
import useInput from 'hooks/Input/useInput';
import useCarousel from 'hooks/Carousel/useCarousel';
import {
  connectGameSocket,
  emitEnterPrivateRoom,
  exitGameRoom,
} from 'logics/socketLogic';
import AvatarImg from './AvatarImg';
import {
  SettingStyle,
  NicknameSettingStyle,
  GameStartButtonStyle,
  Nickname,
  InputWrapper,
  AvatarSettingStyle,
  AvatarChoiceStyle,
  LeftBtn,
  RightBtn,
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
    let socket = gameSocket;
    if (!gameSocket) {
      socket = connectGameSocket();
      setGameSocket(socket);
    }
    const privateRoomId = hash.slice(1, hash.length);
    setRoom(new Room(privateRoomId, PRIVATE_ROOM_NAME));

    exitGameRoom(socket, {
      roomType: PRIVATE_ROOM_NAME,
      roomId: privateRoomId,
    });
  }, [gameSocket, hash, setGameSocket, setRoom]);

  function onClickGameStart() {
    emitEnterPrivateRoom(gameSocket, {
      nickname,
      roomId: room.roomId,
      avatar,
    });
    history.push(`waiting:${room.roomId}`);
  }

  return (
    <SettingStyle>
      <NicknameSettingStyle>
        닉네임
        <InputWrapper>
          <Nickname onChange={onChangeNickname} />
        </InputWrapper>
      </NicknameSettingStyle>
      <AvatarSettingStyle>
        아바타
        <AvatarChoiceStyle>
          <LeftBtn onClick={clickLeftBtn}>{'<'}</LeftBtn>
          <AvatarImg avatarIdx={avatar} />
          <RightBtn onClick={clickRightBtn}>{'>'}</RightBtn>
        </AvatarChoiceStyle>
      </AvatarSettingStyle>
      <GameStartButtonStyle onClick={onClickGameStart}>
        게임 시작
      </GameStartButtonStyle>
    </SettingStyle>
  );
}
