/* eslint no-param-reassign:0 */
import { fabric } from 'fabric';
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import { getDistance, getAngle } from 'util/Circle';

class Circle extends Tool {
  draw(fc, e) {
    const { startPoint, endPoint } = e;
    const { strokeColor, fillColor, strokeWidth } = e.drawingOptions;
    const circle = new fabric.Circle({
      left: startPoint.x,
      top: startPoint.y,
      ...DEFAULT_CIRCLE_OPTIONS,
      stroke: strokeColor,
      fill: fillColor,
      strokeWidth,
    });

    circle.set({
      radius: getDistance(startPoint, endPoint) / 2,
      angle: getAngle(startPoint, endPoint),
    });
    circle.setCoords();
    fc.add(circle);
    fc.renderAll();
  }
}

export default Circle;
