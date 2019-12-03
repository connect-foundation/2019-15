/* eslint no-param-reassign:0 */
import Tool from 'components/CanvasSection/DrawingPlayGround/Tools/ToolType/Tool';

class NonPainterPen extends Tool {
  setCanvas(fabricCanvas, { strokeWidth, strokeColor }) {
    super.setCanvas(fabricCanvas);
    this.ctx = fabricCanvas.contextContainer;
    this.options = {
      strokeWidth,
      strokeColor,
    };
  }

  onMouseDown({ x, y }) {
    this.isDown = true;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.options.strokeColor;
    this.ctx.lineWidth = this.options.strokeWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  onMouseMove({ x, y }) {
    if (!this.isDown) return;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  onMouseUp() {
    if (!this.isDown) return;
    this.isDown = false;
    this.ctx.closePath();
  }

  onMouseOut() {}
}

export default NonPainterPen;
