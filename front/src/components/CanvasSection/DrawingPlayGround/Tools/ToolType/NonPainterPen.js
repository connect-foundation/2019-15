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
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = this.options.strokeColor;
    this.ctx.lineWidth = this.options.strokeWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  onMouseMove({ x, y }) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  onMouseUp() {
    this.ctx.closePath();
  }

  onMouseOut() {}
}

export default NonPainterPen;
