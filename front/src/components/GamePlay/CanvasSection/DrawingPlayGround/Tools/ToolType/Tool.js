/* eslint class-methods-use-this:0 */
class Tool {
  setCanvas(fabricCanvas) {
    this.fc = fabricCanvas;
  }

  onMouseDown() {}

  onMouseMove() {}

  onMouseUp() {}

  getName() {
    return this.constructor.name.toLowerCase();
  }
}

export default Tool;
