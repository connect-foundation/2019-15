import React from 'react';
import PropTypes from 'prop-types';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import ToolManager from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolManager';
import ToolTypeStyle from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/ToolType.style';

ToolType.propTypes = {
  tool: PropTypes.oneOf(ToolManager.TOOL_LIST).isRequired,
  changeTool: PropTypes.func.isRequired,
};

export default function ToolType({ tool, changeTool }) {
  return (
    <ToolTypeStyle>
      {ToolManager.TOOL_LIST.map((toolName) => (
        <SpectreButton
          active={toolName === tool}
          key={toolName}
          onClick={() => changeTool(toolName)}
        >
          {toolName}
        </SpectreButton>
      ))}
    </ToolTypeStyle>
  );
}
