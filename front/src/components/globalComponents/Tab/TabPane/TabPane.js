import React from 'react';
import PropTypes from 'prop-types';
import TabPaneStyle from './TabPane.style';

TabPane.propTypes = {
  children: PropTypes.element,
};

TabPane.defaultProps = {
  children: [],
};

export default function TabPane({ children }) {
  return <TabPaneStyle>{children}</TabPaneStyle>;
}
