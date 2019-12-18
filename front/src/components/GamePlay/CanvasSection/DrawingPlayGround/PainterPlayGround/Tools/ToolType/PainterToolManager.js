import Line from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Line';
import Pen from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Pen';
import Circle from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Circle';
import Eraser from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/Tools/ToolType/Eraser';

const pen = new Pen();
const eraser = new Eraser();
const line = new Line();
const circle = new Circle();

const PainterToolManager = {
  pen,
  line,
  circle,
  eraser,
  toolList: ['pen', 'eraser', 'line', 'circle'],
  freeDrawingTools: ['pen', 'eraser'],
};

export default PainterToolManager;
