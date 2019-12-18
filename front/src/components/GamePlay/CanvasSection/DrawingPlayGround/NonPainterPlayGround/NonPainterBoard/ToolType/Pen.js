/* eslint no-param-reassign:0 */
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';

class Pen extends Tool {
  setCanvas(fabricCanvas, { strokeWidth, strokeColor }) {
    super.setCanvas(fabricCanvas);
    this.fc.freeDrawingBrush.width = strokeWidth;
    this.fc.freeDrawingBrush.color = strokeColor;
  }

  onMouseDown(pointers) {
    console.log('mousedown');
    const mouseDownEvt = this.getMouseEvent('onmousedown', pointers);
    this.fc._onMouseDown(mouseDownEvt);
  }

  onMouseMove(pointers) {
    console.log('mousemove');
    const mouseMoveEvt = this.getMouseEvent('onmousemove', pointers);
    this.fc._onMouseMove(mouseMoveEvt);
  }

  onMouseUp(pointers) {
    console.log('mouseup');
    const mouseUpEvt = this.getMouseEvent('onmouseup', pointers);
    this.fc._onMouseUp(mouseUpEvt);
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
