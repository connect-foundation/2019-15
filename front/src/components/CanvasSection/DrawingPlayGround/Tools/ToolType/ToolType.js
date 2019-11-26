import React from 'react';
import PropTypes from 'prop-types';
import ToolManager from './ToolManager';
import SpectreButton from '../../../globalComponents/SpectreButton/SpectreButton';
import Tool from './Tool';
import ToolTypeStyle from './ToolType.style';

const ToolType = ({ tool, changeTool }) => {
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
};

ToolType.propTypes = {
  tool: PropTypes.instanceOf(Tool).isRequired,
  changeTool: PropTypes.func.isRequired,
};

export default ToolType;
