import React, { useEffect, useContext } from 'react';
import GlobalContext from '../../global.context';

const SecretGame = () => {
  const { io, user } = useContext(GlobalContext);
  useEffect(() => {
    async function init() {
      const { nickname } = user;
      const roomId = window.location.href.split('secret:')[1];
      await io.connectSocket();
      io.requestMakeSecretRoom({ nickname, roomId });
    }
    init();
  });

  return <>안녕!</>;
};

export default SecretGame;
