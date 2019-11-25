import { fabric } from 'fabric';
import Tool from './Tool';

class Line extends Tool {
  setCanvas(fabricCanvas, options) {
    super.setCanvas(fabricCanvas);
    this.fc.isDrawingMode = false;
    this.fc.selection = false;
    this.fc.forEachObject((obj) => {
      obj.selectable = false;
      obj.evented = false;
    });
    this.options = {
      ...Line.defaultOptions(),
      stroke: options.strokeColor,
    };
  }

  static defaultOptions() {
    return {
      strokeWidth: 5,
      fill: '#000',
      stroke: '#000',
      originX: 'center',
      originY: 'center',
      selectable: false,
      evented: false,
    };
  }

  onMouseDown({ e }) {
    this.isDown = true;
    const { x, y } = this.fc.getPointer(e);
    this.line = new fabric.Line([x, y, x, y], this.options);
    this.fc.add(this.line);
  }

  onMouseMove({ e }) {
    if (!this.isDown) return;
    const { x, y } = this.fc.getPointer(e);
    this.line.set({ x2: x, y2: y });
    this.line.setCoords();
    this.fc.renderAll();
  }

  onMouseUp() {
    this.isDown = false;
  }

  onMouseOut() {
    this.isDown = false;
  }
}

export default Line;
