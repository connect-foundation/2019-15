import React from 'react';
import ImageStyle from './Image.style';

const Image = ({src, width, height}) => {
  return <ImageStyle src={src} width={width} height={height} />
}

export default Image;