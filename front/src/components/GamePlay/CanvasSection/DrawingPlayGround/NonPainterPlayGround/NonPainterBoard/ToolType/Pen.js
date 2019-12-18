/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import { getClientPointer } from 'constant/DrawingPlayGround';

class Pen extends Tool {
  setCanvas(fabricCanvas, { strokeWidth, strokeColor }) {
    super.setCanvas(fabricCanvas);
    this.fc.freeDrawingBrush.width = strokeWidth;
    this.fc.freeDrawingBrush.color = strokeColor;
  }

  onMouseDown(pointers) {
    const clientPointer = getClientPointer(this.fc._offset, pointers);
    this.fc._onMouseDownInDrawingMode(clientPointer);
  }

  onMouseMove(pointers) {
    const clientPointer = getClientPointer(this.fc._offset, pointers);
    this.fc._onMouseMoveInDrawingMode(clientPointer);
  }

  onMouseUp(pointers) {
    const clientPointer = getClientPointer(this.fc._offset, pointers);
    this.fc._onMouseUpInDrawingMode(clientPointer);
  }
}

export default Pen;
