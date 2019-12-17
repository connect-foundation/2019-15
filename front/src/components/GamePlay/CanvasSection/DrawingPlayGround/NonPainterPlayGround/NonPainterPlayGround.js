import React from 'react';
import PropTypes from 'prop-types';
import NonPainterBoard from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/NonPainterBoard';
import { ToolsStyle } from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/Tools.style';
import { CenterSpanStyle } from 'components/GamePlay/CanvasSection/DrawingPlayGround/DrawingPlayGround.style';

NonPainterPlayGround.propTypes = {
  painterNickname: PropTypes.string,
};

NonPainterPlayGround.defaultProps = {
  painterNickname: '',
};

export default function NonPainterPlayGround({ painterNickname }) {
  return (
    <>
      <NonPainterBoard />
      <ToolsStyle>
        <CenterSpanStyle>
          {painterNickname}님이 그림을 그리고 있습니다.
        </CenterSpanStyle>
      </ToolsStyle>
    </>
  );
}
