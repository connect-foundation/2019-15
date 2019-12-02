import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from 'global.context';
import Room from 'logics/room';

import mainlogo from 'asset/mainlogo_yellowpink.png';
import { LogoImage, NavigationBarStyle } from './NavigationBar.style';
import ButtonContainer from './ButtonContainer/ButtonContainer';

export default function NavigationBar() {
  const { io, user, room, setRoom } = useContext(GlobalContext);

  async function onClickExit() {
    const { nickname } = user;
    const { roomType, roomId } = room;
    await io.exitGameRoom({ nickname, roomType, roomId });
    setRoom(new Room());
  }

  return (
    <NavigationBarStyle id="NavigationBar">
      <Link to="/main" onClick={onClickExit}>
        <LogoImage src={mainlogo} />
      </Link>
      <ButtonContainer />
    </NavigationBarStyle>
  );
}
