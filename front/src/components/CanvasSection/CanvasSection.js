import React from 'react';
import Canvas from './Canvas/Canvas';
import WordChoice from './WordChoice/WordChoice';
import CanvasSectionStyle from './CanvasSection.style';

const CanvasSection = () => {
  return (
    <CanvasSectionStyle>
      <WordChoice />
      <Canvas />
    </CanvasSectionStyle>
  );
};

export default CanvasSection;
