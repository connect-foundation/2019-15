import React from 'react';
import PropTypes from 'prop-types';
import TabPaneStyle from './TabPane.style';

// eslint-disable-next-line no-unused-vars
const TabPane = ({ paneName, children }) => {
  return <TabPaneStyle>{children}</TabPaneStyle>;
};

TabPane.propTypes = {
  paneName: PropTypes.string.isRequired,
  children: PropTypes.element,
};

TabPane.defaultProps = {
  children: [],
};

export default TabPane;
