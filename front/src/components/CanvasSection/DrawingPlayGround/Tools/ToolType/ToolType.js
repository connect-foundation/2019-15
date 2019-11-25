import React from 'react';
import PropTypes from 'prop-types';
import ToolManager from './ToolManager';
import SButton from '../../../../globalComponents/SButton/SButton';
import Tool from './Tool';
import ToolTypeStyle from './ToolType.style';

const ToolType = ({ tool, changeTool }) => {
  return (
    <ToolTypeStyle>
      {ToolManager.TOOL_LIST().map((toolName) => (
        <SButton
          active={toolName === tool.getName()}
          key={toolName}
          onClick={() => changeTool(toolName)}
        >
          {toolName}
        </SButton>
      ))}
    </ToolTypeStyle>
  );
};

ToolType.propTypes = {
  tool: PropTypes.instanceOf(Tool).isRequired,
  changeTool: PropTypes.func.isRequired,
};

export default ToolType;
