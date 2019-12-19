/* eslint no-param-reassign:0 */
import { fabric } from 'fabric';
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import { DEFAULT_LINE_OPTIONS } from 'constants/DrawingPlayGround';

class Line extends Tool {
  draw({ startPoint, endPoint, drawingOptions }) {
    const { x, y } = startPoint;
    const { x: x2, y: y2 } = endPoint;
    const { strokeColor, strokeWidth } = drawingOptions;
    const line = new fabric.Line([x, y, x, y], {
      ...DEFAULT_LINE_OPTIONS,
      stroke: strokeColor,
      fill: strokeColor,
      strokeWidth,
    });
    line.set({ x2, y2 });
    line.setCoords();
    this.fc.add(line);
    this.fc.bringForward(line);
  }
}

export default Line;
