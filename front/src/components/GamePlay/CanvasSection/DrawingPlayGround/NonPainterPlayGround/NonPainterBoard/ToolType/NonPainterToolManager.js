import Line from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Line';
import Circle from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Circle';
import Eraser from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Eraser';
import Pen from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Brush';

const line = new Line();
const pen = new Pen();
const eraser = new Eraser();
const circle = new Circle();

const NonPainterToolManager = {
  pen,
  line,
  circle,
  eraser,
  toolList: ['pen', 'line', 'circle', 'eraser'],
  freeDrawings: ['pen', 'eraser'],
  initialize(fc) {
    this.toolList.forEach((tool) => this[tool].setCanvas(fc));
  },
};

export default NonPainterToolManager;
