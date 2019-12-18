/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';

class Eraser extends Tool {
  setCanvas(fabricCanvas) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = true;
    this.fc.selection = false;
    this.fc.freeDrawingBrush.width = 50;
    this.fc.freeDrawingBrush.color = '#FFFFFF';
  }
}

export default Eraser;
