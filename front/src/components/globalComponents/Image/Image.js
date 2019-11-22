import React from 'react';
import PropTypes from 'prop-types';
import ImageStyle from './Image.style';

const Image = ({ src }) => <ImageStyle src={src} />;

Image.propTypes = {
  src: PropTypes.string,
};

Image.defaultProps = {
  src: null,
};

export default Image;
