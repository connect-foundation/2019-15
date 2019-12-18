/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';

class Eraser extends Tool {
  setCanvas(fabricCanvas) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = true;
    const { width, color } = DEFAULT_ERASER_OPTIONS;
    this.fc.freeDrawingBrush.width = width;
    this.fc.freeDrawingBrush.color = color;
  }
}

export default Eraser;
