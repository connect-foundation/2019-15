import Tool from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/Tool';

class Pen extends Tool {
  setCanvas(fabricCanvas, options) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = true;
    this.options = {
      ...Pen.defaultOptions(),
      ...options,
    };
    this.fc.freeDrawingBrush.width = this.options.width;
    this.fc.freeDrawingBrush.color = this.options.strokeColor;
  }

  static defaultOptions() {
    return { width: 1, strokeColor: '#000000' };
  }
}

export default Pen;
