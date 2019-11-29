import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../global.context';
import Room from '../../logics/room';

import { LogoImage, NavigationBarStyle } from './NavigationBar.style';
import ButtonContainer from './ButtonContainer/ButtonContainer';
import mainlogo from '../../asset/mainlogo4.png';

const NavigationBar = () => {
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
};

export default NavigationBar;
