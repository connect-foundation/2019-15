import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Tab from '../../components/globalComponents/Tab/Tab';
import TabPane from '../../components/globalComponents/Tab/TabPane/TabPane';
import RankingAll from '../../components/Ranking/RankingAll/RankingAll';
import RankingFriends from '../../components/Ranking/RankingFriends/RankingFriends';
import MyInfoSection from '../../components/MyInfoSection/MyInfoSection';
import MyPageStyle from './MyPage.style';
import ContentSection from '../../components/globalComponents/ContentSection/ContentSection';

const MyPage = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      {/* <NavigationBar /> */}
      <MyPageStyle id="MyPage">
        <ContentSection title="랭킹">
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

        <ContentSection title="내 정보">
          <MyInfoSection />
        </ContentSection>
      </MyPageStyle>
    </>
  );
};

export default MyPage;
