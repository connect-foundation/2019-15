import React from 'react';
import PropTypes from 'prop-types';
import ImageStyle from 'components/globalComponents/Image/Image.style';

Image.propTypes = {
  src: PropTypes.string,
};

Image.defaultProps = {
  src: null,
};

export default function Image({ src }) {
  return <ImageStyle src={src} />;
}
