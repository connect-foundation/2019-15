/* eslint no-param-reassign:0 */
import { fabric } from 'fabric';
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import { getDistance, getAngle } from 'utils/Circle';
import { DEFAULT_CIRCLE_OPTIONS } from 'constants/DrawingPlayGround';

class Circle extends Tool {
  draw({ startPoint, endPoint, drawingOptions }) {
    const { strokeColor, fillColor, strokeWidth } = drawingOptions;
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
    this.fc.add(circle);
  }
}

export default Circle;
