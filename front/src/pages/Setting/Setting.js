import React from 'react';
import Setting from 'components/Setting/Setting';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Background from 'components/globalComponents/Container/Background.style';

export default function SettingPage() {
  return (
    <>
      <NavigationBar />
      <Background>
        <Setting />
      </Background>
    </>
  );
}
