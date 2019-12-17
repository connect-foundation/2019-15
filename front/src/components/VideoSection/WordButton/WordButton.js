import React from 'react';
import WordButtonStyle from 'components/VideoSection/WordButton/WordButton.style';
import PropTypes from 'prop-types';

WordButton.propTypes = {
  children: PropTypes.string,
};

WordButton.defaultProps = {
  children: null,
};

export default function WordButton({ children }) {
  return <WordButtonStyle>{children}</WordButtonStyle>;
}
