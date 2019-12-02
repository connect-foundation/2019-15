import Tool from './Tool';

class Cursor extends Tool {
  setCanvas(fabricCanvas, options) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = false;
    this.fc.selection = false;
  }
}

export default Cursor;
