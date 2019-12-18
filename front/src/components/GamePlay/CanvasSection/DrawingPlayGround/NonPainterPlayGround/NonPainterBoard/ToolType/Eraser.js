/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';

class Pen extends Tool {
  setCanvas(fabricCanvas) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = true;
    this.fc.selection = false;
    this.fc.freeDrawingBrush.width = 50;
    this.fc.freeDrawingBrush.color = '#FFFFFF';
  }

  onMouseDown(pointers) {
    const mouseDownEvt = this.getMouseEvent('onmousedown', pointers);
    this.fc._onMouseDownInDrawingMode(mouseDownEvt);
  }

  onMouseMove(pointers) {
    const mouseMoveEvt = this.getMouseEvent('onmousemove', pointers);
    this.fc._onMouseMoveInDrawingMode(mouseMoveEvt);
  }

  onMouseUp(pointers) {
    const mouseUpEvt = this.getMouseEvent('onmouseup', pointers);
    this.fc._onMouseUpInDrawingMode(mouseUpEvt);
  }

  getMouseEvent(event, pointers) {
    return new MouseEvent(event, {
      bubbles: true,
      cancelable: true,
      view: window,
      ...pointers,
    });
  }
}

export default Pen;
