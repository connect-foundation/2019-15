import React from 'react';
import PropTypes from 'prop-types';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import ToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolManager';
import {
  ToolTypeStyle,
  ToolTypeSelectionStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolType.style';

ToolType.propTypes = {
  tool: PropTypes.oneOf(ToolManager.toolList).isRequired,
  changeTool: PropTypes.func.isRequired,
};

export default function ToolType({ tool, changeTool }) {
  return (
    <ToolTypeStyle>
      <ToolTypeSelectionStyle>
        {ToolManager.toolList.map((toolName) => (
          <SpectreButton
            height="1.7rem"
            active={toolName === tool}
            key={toolName}
            onClick={() => changeTool(toolName)}
          >
            {toolName}
          </SpectreButton>
        ))}
      </ToolTypeSelectionStyle>
    </ToolTypeStyle>
  );
}
