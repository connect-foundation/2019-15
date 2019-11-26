import React from 'react';
import PropTypes from 'prop-types';
import ChattingListStyle from './ChattingList.style';

ChattingList.propTypes = {
  children: PropTypes.node,
};

ChattingList.defaultProps = {
  children: null,
};

function ChattingList({ children }) {
  // components 추가 예정
  return <ChattingListStyle>{children}</ChattingListStyle>;
}

export default ChattingList;
