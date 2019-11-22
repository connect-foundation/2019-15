import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TabPane from './TabPane/TabPane';
import { TabContentStyle, TabStyle } from './Tab.style';
import TabPaneBtnList from './TabPaneBtnList/TabPaneBtnList';

const Tab = ({ children: paneList, activeTabColor, inActiveTabColor }) => {
  const [activeTabPaneIdx, setActiveTabPaneIdx] = useState(0);

  const paneNameList = paneList.map((pane) => pane.props.paneName);
  return (
    <TabStyle id={'Tab'}>
      <TabPaneBtnList
        activeTabColor={activeTabColor}
        inActiveTabColor={inActiveTabColor}
        tabSelected={activeTabPaneIdx}
        paneNameList={paneNameList}
        selectTab={setActiveTabPaneIdx}
      />
      <TabContentStyle activeTabPaneIdx={activeTabPaneIdx}>
        {paneList}
      </TabContentStyle>
    </TabStyle>
  );
};

Tab.propTypes = {
  activeTabColor: PropTypes.string,
  inActiveTabColor: PropTypes.string,
  children: PropTypes.arrayOf(TabPane),
};

Tab.defaultProps = {
  activeTabColor: '#ffffff',
  inActiveTabColor: '#e8e8e8',
  children: null,
};

export default Tab;
