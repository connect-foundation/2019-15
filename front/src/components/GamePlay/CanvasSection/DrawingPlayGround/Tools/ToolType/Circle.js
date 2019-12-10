/* eslint no-param-reassign:0 */
import { fabric } from 'fabric';
import Tool from 'components/GamePlay/CanvasSection/DrawingPlayGround/Tools/ToolType/Tool';
import { getDistance, getAngle } from 'util/Circle';

class Circle extends Tool {
  setCanvas(fabricCanvas, { fillColor, strokeWidth, strokeColor }) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = false;
    this.fc.selection = false;
    this.fc.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });
    this.options = {
      ...Circle.defaultOptions(),
      stroke: strokeColor,
      fill: fillColor,
      strokeWidth,
    };
  }

  static defaultOptions() {
    return {
      originX: 'left',
      originY: 'center',
      selectable: false,
      evented: false,
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
    console.log(
      getDistance(this.startPoint, endPoint) / 2,
      getAngle(this.startPoint, endPoint),
    );
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
