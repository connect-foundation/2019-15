/* eslint no-param-reassign:0 */
import { fabric } from 'fabric';
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';

class Line extends Tool {
  static defaultOptions() {
    return {
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    };
  }

  draw(fc, e) {
    const { x, y } = e.startPoint;
    const { x: x2, y: y2 } = e.endPoint;
    const { strokeColor, strokeWidth } = e.drawingOptions;
    const line = new fabric.Line([x, y, x, y], {
      ...Line.defaultOptions(),
      stroke: strokeColor,
      fill: strokeColor,
      strokeWidth,
    });
    line.set({ x2, y2 });
    line.setCoords();
    fc.add(line);
  }
}

export default Line;
