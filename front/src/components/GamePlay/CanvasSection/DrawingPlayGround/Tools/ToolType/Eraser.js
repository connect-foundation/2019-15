/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/Tool';

class Eraser extends Tool {
  setCanvas(fabricCanvas, { strokeWidth, strokeColor }) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = true;
    this.fc.selection = false;
    this.fc.freeDrawingBrush.width = strokeWidth;
    this.fc.freeDrawingBrush.color = '#FFFFFF';
  }
}

export default Eraser;
