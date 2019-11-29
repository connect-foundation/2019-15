import Line from './Line';
import Pen from './Pen';
import Cursor from './Cursor';

class ToolManager {
  constructor() {
    this.pen = new Pen();
    this.line = new Line();
    this.cursor = new Cursor();
  }

  static TOOL_LIST() {
    return ['pen', 'line'];
  }
}

export default ToolManager;
