import React from 'react';
import WordButtonStyle from 'components/VideoSection/WordButton/WordButton.style';
import PropTypes from 'prop-types';

WordButton.propTypes = {
  children: PropTypes.arrayOf(String),
  onClick: PropTypes.func,
};

WordButton.defaultProps = {
  children: null,
  onClick: null,
};

export default function WordButton({ children, onClick }) {
  return <WordButtonStyle onClick={onClick}>{children}</WordButtonStyle>;
}
