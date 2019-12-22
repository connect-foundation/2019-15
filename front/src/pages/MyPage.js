import React, { useEffect, useContext } from 'react';
import MyInfoSection from 'components/MyInfoSection/MyInfoSection';
import ContentSection from 'components/globalComponents/ContentSection/ContentSection';
import Background from 'components/globalComponents/Container/Background.style';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Ranking from 'components/Ranking/Ranking';
import VideoSection from 'components/VideoSection/VideoSection';
import { checkAuth } from 'utils/catchmymind/auth';
import GlobalContext from 'global.context';
import { useHistory } from 'react-router-dom';

export default function MyPage() {
  const { setIsLogin, isLogin } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    checkAuth(null, setIsLogin);
  });

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
      <Background id="MyPage">
        <ContentSection title="움짤">
          <VideoSection />
        </ContentSection>
        <ContentSection title="랭킹">
          <Ranking />
        </ContentSection>
        <ContentSection title="내 정보">
          <MyInfoSection />
        </ContentSection>
      </Background>
    </>
  );
}
