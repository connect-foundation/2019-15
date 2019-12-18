import React, { useReducer } from 'react';
import Tools from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/Tools';
import PainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterBoard/PainterBoard';
import { DEFAULT_DRAWING_OPTIONS } from 'constant/DrawingPlayGround';

const setDrawingOptions = (prev, { type, value }) => {
  switch (type) {
    case 'tool':
      return { ...prev, tool: value };
    case 'strokeColor':
      return { ...prev, strokeColor: value };
    case 'strokeWidth':
      return { ...prev, strokeWidth: value };
    case 'fillColor':
      return { ...prev, fillColor: value };
    default:
      throw new Error(`${type} is wrong action type`);
  }
};

export default function PainterPlayGround() {
  const [drawingOptions, drawingOptionsDispatcher] = useReducer(
    setDrawingOptions,
    DEFAULT_DRAWING_OPTIONS,
  );

  return (
    <>
      <PainterBoard drawingOptions={drawingOptions} />
      <Tools
        drawingOptions={drawingOptions}
        setDrawingOptions={drawingOptionsDispatcher}
      />
    </>
  );
}
