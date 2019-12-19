import Brush from 'components/GamePlay/CanvasSection/DrawingPlayGround/NonPainterPlayGround/NonPainterBoard/ToolType/Brush';
import { DEFAULT_ERASER_OPTIONS } from 'constants/DrawingPlayGround';

class Eraser extends Brush {
  setOptions() {
    this.color = DEFAULT_ERASER_OPTIONS.color;
    this.width = DEFAULT_ERASER_OPTIONS.width;
  }
}

export default Eraser;
