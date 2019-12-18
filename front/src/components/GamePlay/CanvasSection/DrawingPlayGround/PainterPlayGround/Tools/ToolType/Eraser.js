/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import { DEFAULT_ERASER_OPTIONS } from 'constant/DrawingPlayGround';

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
