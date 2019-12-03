import Line from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/Line';
import Pen from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/Pen';

const pen = new Pen();
const line = new Line();

const ToolManager = {
  pen,
  line,
  TOOL_LIST: ['pen', 'line'],
};

export default ToolManager;
