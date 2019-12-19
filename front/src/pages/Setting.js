import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import Setting from 'components/Setting/Setting';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';
import useInitGameSocket from 'hooks/Socket/useInitGameSocket';

export default function SettingPage() {
  const { setGameSocket } = useContext(GlobalContext);
  setGameSocket(useInitGameSocket());

  return (
    <>
      <NavigationBar />
      <Background>
        <Setting />
      </Background>
    </>
  );
}
