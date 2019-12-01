import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Tab from 'components/globalComponents/Tab/Tab';
import TabPane from 'components/globalComponents/Tab/TabPane/TabPane';
import RankingAll from 'components/Ranking/RankingAll/RankingAll';
import RankingFriends from 'components/Ranking/RankingFriends/RankingFriends';
import MyInfoSection from 'components/MyInfoSection/MyInfoSection';
import ContentSection from 'components/globalComponents/ContentSection/ContentSection';
import Background from 'components/globalComponents/Container/Background.style';
import NavigationBar from 'components/NavigationBar/NavigationBar';

const MyPage = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <NavigationBar />
      <Background id="MyPage">
        <ContentSection title="랭킹" height="33rem">
          <Tab
            activeTabColor={themeContext.amour}
            inActiveTabColor={themeContext.wePeep}
          >
            <TabPane paneName="전체 랭킹">
              <RankingAll />
            </TabPane>
            <TabPane paneName="친구 랭킹">
              <RankingFriends />
            </TabPane>
          </Tab>
        </ContentSection>

        <ContentSection title="내 정보" height="33rem">
          <MyInfoSection />
        </ContentSection>
      </Background>
    </>
  );
};

export default MyPage;
