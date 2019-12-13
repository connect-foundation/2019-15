import React, { useContext, useEffect } from 'react';
import GlobalContext from 'global.context';
import Setting from 'components/Setting/Setting';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';
import { connectGameSocket } from 'logics/socketLogic';

export default function SettingPage() {
  const { gameSocket, setGameSocket } = useContext(GlobalContext);

  useEffect(() => {
    if (!gameSocket) {
      const socket = connectGameSocket();
      setGameSocket(socket);
    }
  }, [gameSocket, setGameSocket]);
  return (
    <>
      <NavigationBar />
      <Background>
        <Setting />
      </Background>
    </>
  );
}
