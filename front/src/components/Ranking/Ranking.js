import React, { useContext } from 'react';
import TabPane from 'components/globalComponents/Tab/TabPane/TabPane';
import RankingAll from 'components/Ranking/RankingAll/RankingAll';
import RankingFriends from 'components/Ranking/RankingFriends/RankingFriends';
import Tab from 'components/globalComponents/Tab/Tab';
import { ThemeContext } from 'styled-components';

export default function Ranking() {
  const themeContext = useContext(ThemeContext);
  return (
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
  );
}
