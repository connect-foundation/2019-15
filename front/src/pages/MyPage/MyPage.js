import React from 'react';
import MyInfoSection from 'components/MyInfoSection/MyInfoSection';
import ContentSection from 'components/globalComponents/ContentSection/ContentSection';
import Background from 'components/globalComponents/Container/Background.style';
import Ranking from 'components/Ranking/Ranking';

const MyPage = () => (
  <>
    {/* <NavigationBar /> */}
    <Background id="MyPage">
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
