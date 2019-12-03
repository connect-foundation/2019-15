import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from 'global.context';
import Room from 'logics/room';

import mainlogo from 'asset/mainlogo_yellowpink.png';
import {
  SmallLogoImage,
  LogoImage,
  NavigationBarStyle,
} from './NavigationBar.style';
import ButtonContainer from './ButtonContainer/ButtonContainer';

export default function NavigationBar() {
  const { io, room, setRoom } = useContext(GlobalContext);

  async function onClickExit() {
    const { roomType, roomId } = room;
    await io.exitGameRoom({ roomType, roomId });
    setRoom(new Room());
  }

  return (
    <NavigationBarStyle id="NavigationBar">
      <Link to="/main" onClick={onClickExit}>
        {window.location.hash === '#/main' ? (
          <LogoImage src={mainlogo} />
        ) : (
          <SmallLogoImage src={mainlogo} />
        )}
      </Link>
      <ButtonContainer />
    </NavigationBarStyle>
  );
}
