import React, { useReducer, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Tools from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/Tools';
import PainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterBoard/PainterBoard';
import NonPainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterBoard/NonPainterBoard';
import GamePlayContext from 'components/GamePlay/GamePlay.context';
import DrawingPlayGroundStyle from './DrawingPlayGround.style';
import Shield from './Shield.style';

DrawingPlayGround.propTypes = {
  drawable: PropTypes.bool.isRequired,
  canvasSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
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
    default:
      throw new Error();
  }
};

export default function DrawingPlayGround({ drawable, canvasSize }) {
  const { painter, userList } = useContext(GamePlayContext);
  const [painterNickname, setPainterNickname] = useState(null);

  const defaultDrawingOptions = {
    tool: 'pen',
    strokeColor: '#000000',
    strokeWidth: 10,
    fillColor: '#000000',
  };

  useEffect(() => {
    const painterInfo = userList.filter((user) => {
      if (user.socketId === painter) return user;
      return false;
    });
    if (painterInfo.length > 0) setPainterNickname(painterInfo[0].nickname);
    drawingOptionsDispatcher({ type: 'tool', value: 'pen' });
  }, [drawable, painter, userList]);
  const [drawingOptions, drawingOptionsDispatcher] = useReducer(
    setDrawingOptions,
    defaultDrawingOptions,
  );

  return (
    <DrawingPlayGroundStyle>
      {drawable ? (
        <PainterBoard drawingOptions={drawingOptions} size={canvasSize} />
      ) : (
        <>
          <NonPainterBoard size={canvasSize} />
          {painterNickname ? (
            <Shield>{painterNickname}님이 그림을 그리고 있습니다.</Shield>
          ) : null}
        </>
      )}
      <Tools
        drawingOptions={drawingOptions}
        setDrawingOptions={drawingOptionsDispatcher}
      />
    </DrawingPlayGroundStyle>
  );
}
