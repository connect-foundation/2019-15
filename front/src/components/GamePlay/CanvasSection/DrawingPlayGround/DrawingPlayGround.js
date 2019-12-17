import React from 'react';
import PropTypes from 'prop-types';
import PainterPlayGround from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterPlayGround';
import NonPainterPlayGround from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterPlayGround';
import DrawingPlayGroundContext from 'components/GamePlay/CanvasSection/DrawingPlayGround/DrawingPlayGround.context';
import { DrawingPlayGroundStyle } from './DrawingPlayGround.style';

DrawingPlayGround.propTypes = {
  drawable: PropTypes.bool.isRequired,
  canvasSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  painterNickname: PropTypes.string,
};

DrawingPlayGround.defaultProps = {
  canvasSize: {
    width: 500,
    height: 500,
  },
  painterNickname: '',
};

export default function DrawingPlayGround({
  drawable,
  canvasSize,
  painterNickname,
}) {
  return (
    <DrawingPlayGroundContext.Provider value={{ canvasSize }}>
      <DrawingPlayGroundStyle>
        {drawable || painterNickname === null ? (
          <PainterPlayGround />
        ) : (
          <NonPainterPlayGround painterNickname={painterNickname} />
        )}
      </DrawingPlayGroundStyle>
    </DrawingPlayGroundContext.Provider>
  );
}
