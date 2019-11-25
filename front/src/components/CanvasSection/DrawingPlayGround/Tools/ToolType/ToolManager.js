import Line from './Line';
import Pen from './Pen';

class ToolManager {
  constructor() {
    this.pen = new Pen();
    this.line = new Line();
  }

  static TOOL_LIST() {
    return ['pen', 'line'];
  }
}

export default ToolManager;
