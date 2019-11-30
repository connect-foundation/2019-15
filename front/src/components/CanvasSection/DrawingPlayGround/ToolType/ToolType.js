import React from 'react';
import PropTypes from 'prop-types';
import SpectreButton from 'components/globalComponents/SpectreButton/SpectreButton';
import ToolManager from './ToolManager';
import Tool from './Tool';
import ToolTypeStyle from './ToolType.style';

ToolType.propTypes = {
  tool: PropTypes.instanceOf(Tool).isRequired,
  changeTool: PropTypes.func.isRequired,
};

export default function ToolType({ tool, changeTool }) {
  return (
    <ToolTypeStyle>
      {ToolManager.TOOL_LIST().map((toolName) => (
        <SpectreButton
          active={toolName === tool.getName()}
          key={toolName}
          onClick={() => changeTool(toolName)}
        >
          {toolName}
        </SpectreButton>
      ))}
    </ToolTypeStyle>
  );
}
