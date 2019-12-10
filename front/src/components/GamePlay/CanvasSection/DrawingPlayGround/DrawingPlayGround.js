import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tools from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/Tools';
import PainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterBoard/PainterBoard';
import NonPainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard';
import { ToolsStyle } from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/Tools.style';

import { DEFAULT_DRAWING_OPTIONS } from 'constant/DrawingPlayGround';
import {
  DrawingPlayGroundStyle,
  CenterSpanStyle,
} from './DrawingPlayGround.style';

DrawingPlayGround.propTypes = {
  drawable: PropTypes.bool.isRequired,
  canvasSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  userList: PropTypes.node.isRequired,
  painter: PropTypes.node.isRequired,
};

DrawingPlayGround.defaultProps = {
  canvasSize: {
    width: 500,
    height: 500,
  },
};

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

export default function DrawingPlayGround({
  drawable,
  canvasSize,
  userList,
  painter,
}) {
  const [drawingOptions, drawingOptionsDispatcher] = useReducer(
    setDrawingOptions,
    DEFAULT_DRAWING_OPTIONS,
  );
  const [painterNickname, setPainterNickname] = useState('');

  useEffect(() => {
    const painterInfo = userList.filter((user) => {
      if (user.socketId === painter) return user;
      return false;
    });
    if (painterInfo.length > 0) setPainterNickname(painterInfo[0].nickname);
    drawingOptionsDispatcher({ type: 'tool', value: 'pen' });
  }, [drawable, painter, userList]);

  return (
    <DrawingPlayGroundStyle>
      {drawable || userList > 1 ? (
        <>
          <PainterBoard drawingOptions={drawingOptions} size={canvasSize} />
          <Tools
            drawingOptions={drawingOptions}
            setDrawingOptions={drawingOptionsDispatcher}
          />
        </>
      ) : (
        <>
          <NonPainterBoard size={canvasSize} />
          <ToolsStyle>
            <CenterSpanStyle>
              {painterNickname}님이 그림을 그리고 있습니다.
            </CenterSpanStyle>
          </ToolsStyle>
        </>
      )}
    </DrawingPlayGroundStyle>
  );
}
