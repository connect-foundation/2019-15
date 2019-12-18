import Line from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Line';
import Pen from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Pen';
import Circle from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Circle';
import Eraser from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Eraser';

const line = new Line();
const pen = new Pen();
const circle = new Circle();
const eraser = new Eraser();

// eraser또한 pen으로 취급하여 해결
const ToolManager = {
  pen,
  line,
  circle,
  eraser,
  toolList: ['pen', 'line', 'circle', 'eraser'],
  freeDrawingTools: ['pen', 'eraser'],
};

export default ToolManager;
