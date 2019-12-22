import React, { useContext } from 'react';
import GlobalContext from 'global.context';
import Setting from 'components/Setting/Setting';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';
import useInitGameSocket from 'hooks/Socket/useInitGameSocket';
import { useHistory } from 'react-router-dom';

export default function SettingPage() {
  const { setGameSocket, isLogin } = useContext(GlobalContext);
  setGameSocket(useInitGameSocket());
  const history = useHistory();

  const moveHome = () => {
    history.replace('/');
  };

  if (!isLogin) {
    moveHome();
    return <></>;
  }

  return (
    <>
      <NavigationBar />
      <Background>
        <Setting />
      </Background>
    </>
  );
}
