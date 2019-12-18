import React from 'react';
import MyInfoSection from 'components/MyInfoSection/MyInfoSection';
import ContentSection from 'components/globalComponents/ContentSection/ContentSection';
import Background from 'components/globalComponents/Container/Background.style';
import NavigationBar from 'components/NavigationBar/NavigationBar';
import Ranking from 'components/Ranking/Ranking';
import VideoSection from 'components/VideoSection/VideoSection';

const MyPage = () => (
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

export default MyPage;
