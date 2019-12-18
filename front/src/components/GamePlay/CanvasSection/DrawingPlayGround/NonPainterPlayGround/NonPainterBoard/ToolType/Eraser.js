/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import {
  DEFAULT_ERASER_OPTIONS,
  getClientPointer,
} from 'constant/DrawingPlayGround';

class Eraser extends Tool {
  setCanvas(fabricCanvas) {
    super.setCanvas(fabricCanvas);
    const { width, color } = DEFAULT_ERASER_OPTIONS;
    this.fc.freeDrawingBrush.width = width;
    this.fc.freeDrawingBrush.color = color;
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

export default Eraser;
