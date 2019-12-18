/* eslint no-param-reassign:0 */
import { fabric } from 'fabric';
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Tool';
import { getDistance, getAngle } from 'util/Circle';
import { DEFAULT_CIRCLE_OPTIONS } from 'constant/DrawingPlayGround';

class Circle extends Tool {
  setCanvas(fabricCanvas, { fillColor, strokeWidth, strokeColor }) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = false;
    this.options = {
      ...DEFAULT_CIRCLE_OPTIONS,
      stroke: strokeColor,
      fill: fillColor,
      strokeWidth,
    };
  }

  onMouseDown(point) {
    this.isDown = true;
    this.startPoint = point;
    this.circle = new fabric.Circle({
      ...this.options,
      left: this.startPoint.x,
      top: this.startPoint.y,
    });
    this.fc.add(this.circle);
  }

  onMouseMove(endPoint) {
    if (!this.isDown) return;
    this.circle.set({
      radius: getDistance(this.startPoint, endPoint) / 2,
      angle: getAngle(this.startPoint, endPoint),
    });
    this.circle.setCoords();
    this.fc.renderAll();
  }

  onMouseUp() {
    this.isDown = false;
  }
}

export default Circle;
