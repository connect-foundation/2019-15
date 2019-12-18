/* eslint no-param-reassign:0 */
import { fabric } from 'fabric';
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import { DEFAULT_LINE_OPTIONS } from 'constant/DrawingPlayGround';

class Line extends Tool {
  setCanvas(fabricCanvas, { strokeWidth, strokeColor }) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = false;
    this.options = {
      ...DEFAULT_LINE_OPTIONS,
      stroke: strokeColor,
      fill: strokeColor,
      strokeWidth,
    };
  }

  static defaultOptions() {
    return {
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    };
  }

  onMouseDown({ x, y }) {
    this.isDown = true;
    this.line = new fabric.Line([x, y, x, y], this.options);
    this.fc.add(this.line);
  }

  onMouseMove({ x, y }) {
    if (!this.isDown) return;
    this.line.set({ x2: x, y2: y });
    this.line.setCoords();
    this.fc.renderAll();
  }

  onMouseUp() {
    this.isDown = false;
  }
}

export default Line;
