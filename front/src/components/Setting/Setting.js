import React, { useContext, useEffect } from 'react';
import GlobalContext from 'global.context';
import { useHistory } from 'react-router-dom';
import {
  connectGameSocket,
  emitMakePrivateRoom,
  emitEnterPrivateRoom,
} from 'logics/socketLogic';
import useInput from 'hooks/Input/useInput';
import Room from 'logics/room';
import {
  SettingStyle,
  RoomSettingStyle,
  UserSettingStyle,
  GameStartButtonStyle,
} from './Setting.style';

export default function Setting() {
  const { user, room, setRoom, gameSocket, setGameSocket } = useContext(
    GlobalContext,
  );
  const [nickname, onChange] = useInput('부스트캠퍼');
  const history = useHistory();

  useEffect(() => {
    function init() {
      const secretRoomId = window.location.hash.split('setting:')[1];

      setRoom(new Room(secretRoomId, '비밀방'));
      if (user.roomOwner) {
        emitMakePrivateRoom(gameSocket, { roomId: secretRoomId });
      }
    }
    init();
  }, [gameSocket, setRoom, user.roomOwner]);

  function onClickGameStart() {
    if (!gameSocket) {
      const socket = connectGameSocket();
      setGameSocket(socket);
    }

    emitEnterPrivateRoom(gameSocket, { nickname, roomId: room.roomId });
    history.push(`private:${room.roomId}`);
  }
  return (
    <SettingStyle>
      <RoomSettingStyle />
      <UserSettingStyle />
      <GameStartButtonStyle onClick={onClickGameStart}>
        게임 시작
      </GameStartButtonStyle>
    </SettingStyle>
  );
}
