import React from 'react';
import PropTypes from 'prop-types';
import {TabButton, TabPaneBtnListStyle} from './TabPaneBtnList.style';

const TabPaneBtnList = ({
  paneNameList,
  tabSelected,
  selectTab,
  activeTabColor,
  inActiveTabColor,
}) => {
  return (
    <TabPaneBtnListStyle>
      {paneNameList.map((paneName, idx) => (
        <TabButton
          activeTabColor={activeTabColor}
          inActiveTabColor={inActiveTabColor}
          active={idx === tabSelected}
          key={paneName}
          onClick={() => selectTab(idx)}
        >
          {paneName}
        </TabButton>
      ))}
    </TabPaneBtnListStyle>
  );
};

TabPaneBtnList.propTypes = {
  activeTabColor: PropTypes.string,
  inActiveTabColor: PropTypes.string,
  tabSelected: PropTypes.number,
  selectTab: PropTypes.func,
  paneNameList: PropTypes.arrayOf(String),
};

TabPaneBtnList.defaultProps = {
  activeTabColor: '#ffffff',
  inActiveTabColor: '#e8e8e8',
  tabSelected: 0,
  selectTab: () => {},
  paneNameList: [],
};

export default TabPaneBtnList;
