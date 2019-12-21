/* eslint no-nested-ternary:0 */
import { fabric } from 'fabric';

const Brush = fabric.util.createClass(fabric.BaseBrush, {
  decimate: 0.4,

  setCanvas(canvas) {
    this.canvas = canvas;
    this._points = [];
  },

  setOptions({ strokeWidth, strokeColor }) {
    this.color = strokeColor;
    this.width = strokeWidth;
  },

  _drawSegment(ctx, p1, p2) {
    const midPoint = p1.midPointFrom(p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    return midPoint;
  },

  onMouseDown(pointer) {
    this._prepareForDrawing(pointer);
    this._captureDrawingPath(pointer);
    this._render();
  },

  onMouseMove(pointer) {
    if (this._captureDrawingPath(pointer) && this._points.length > 1) {
      if (this.needsFullRender()) {
        this.canvas.clearContext(this.canvas.contextTop);
        this._render();
      } else {
        const points = this._points;
        const { length } = points;
        const ctx = this.canvas.contextTop;
        // draw the curve update
        this._saveAndTransform(ctx);
        if (this.oldEnd) {
          ctx.beginPath();
          ctx.moveTo(this.oldEnd.x, this.oldEnd.y);
        }
        this.oldEnd = this._drawSegment(
          ctx,
          points[length - 2],
          points[length - 1],
          true,
        );
        ctx.stroke();
        ctx.restore();
      }
    }
  },

  onMouseUp() {
    this.oldEnd = undefined;
    this._finalizeAndAddPath();
    return false;
  },

  _prepareForDrawing(pointer) {
    const p = new fabric.Point(pointer.x, pointer.y);

    this._reset();
    this._addPoint(p);
    this.canvas.contextTop.moveTo(p.x, p.y);
  },

  _addPoint(point) {
    if (
      this._points.length > 1 &&
      point.eq(this._points[this._points.length - 1])
    ) {
      return false;
    }
    this._points.push(point);
    return true;
  },

  _reset() {
    this._points = [];
    this._setBrushStyles();
    this._setShadow();
  },

  _captureDrawingPath(pointer) {
    const pointerPoint = new fabric.Point(pointer.x, pointer.y);
    return this._addPoint(pointerPoint);
  },

  _render() {
    const ctx = this.canvas.contextTop;
    let i;
    let len;
    let p1 = this._points[0];
    let p2 = this._points[1];

    this._saveAndTransform(ctx);
    ctx.beginPath();
    if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
      const width = this.width / 1000;
      p1 = new fabric.Point(p1.x, p1.y);
      p2 = new fabric.Point(p2.x, p2.y);
      p1.x -= width;
      p2.x += width;
    }
    ctx.moveTo(p1.x, p1.y);

    for (i = 1, len = this._points.length; i < len; i += 1) {
      // we pick the point between pi + 1 & pi + 2 as the
      // end point and p1 as our control point.
      this._drawSegment(ctx, p1, p2);
      p1 = this._points[i];
      p2 = this._points[i + 1];
    }
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
    ctx.restore();
  },

  convertPointsToSVGPath(points) {
    const path = [];
    let i;
    const width = this.width / 1000;
    let p1 = new fabric.Point(points[0].x, points[0].y);
    let p2 = new fabric.Point(points[1].x, points[1].y);
    const len = points.length;
    let multSignX = 1;
    let multSignY = 0;
    const manyPoints = len > 2;

    if (manyPoints) {
      multSignX = points[2].x < p2.x ? -1 : points[2].x === p2.x ? 0 : 1;
      multSignY = points[2].y < p2.y ? -1 : points[2].y === p2.y ? 0 : 1;
    }
    path.push(
      'M ',
      p1.x - multSignX * width,
      ' ',
      p1.y - multSignY * width,
      ' ',
    );
    for (i = 1; i < len; i += 1) {
      if (!p1.eq(p2)) {
        const midPoint = p1.midPointFrom(p2);
        // p1 is our bezier control point
        // midpoint is our endpoint
        // start point is p(i-1) value.
        path.push('Q ', p1.x, ' ', p1.y, ' ', midPoint.x, ' ', midPoint.y, ' ');
      }
      p1 = points[i];
      if (i + 1 < points.length) {
        p2 = points[i + 1];
      }
    }
    if (manyPoints) {
      multSignX =
        p1.x > points[i - 2].x ? 1 : p1.x === points[i - 2].x ? 0 : -1;
      multSignY =
        p1.y > points[i - 2].y ? 1 : p1.y === points[i - 2].y ? 0 : -1;
    }
    path.push('L ', p1.x + multSignX * width, ' ', p1.y + multSignY * width);
    return path;
  },

  createPath(pathData) {
    const path = new fabric.Path(pathData, {
      fill: null,
      stroke: this.color,
      strokeWidth: this.width,
      strokeLineCap: this.strokeLineCap,
      strokeMiterLimit: this.strokeMiterLimit,
      strokeLineJoin: this.strokeLineJoin,
      strokeDashArray: this.strokeDashArray,
    });
    if (this.shadow) {
      this.shadow.affectStroke = true;
      path.setShadow(this.shadow);
    }

    return path;
  },

  decimatePoints(points, distance) {
    if (points.length <= 2) {
      return points;
    }
    const zoom = this.canvas.getZoom();
    const adjustedDistance = (distance / zoom) * (distance / zoom);
    let i;
    const l = points.length - 1;
    let lastPoint = points[0];
    const newPoints = [lastPoint];
    let cDistance;
    for (i = 1; i < l; i += 1) {
      cDistance =
        (lastPoint.x - points[i].x) * (lastPoint.x - points[i].x) +
        (lastPoint.y - points[i].y) * (lastPoint.y - points[i].y);
      if (cDistance >= adjustedDistance) {
        lastPoint = points[i];
        newPoints.push(lastPoint);
      }
    }
    if (newPoints.length === 1) {
      newPoints.push(new fabric.Point(newPoints[0].x, newPoints[0].y));
    }
    return newPoints;
  },

  _finalizeAndAddPath() {
    const ctx = this.canvas.contextTop;
    ctx.closePath();
    if (this.decimate) {
      this._points = this.decimatePoints(this._points, this.decimate);
    }
    const pathData = this.convertPointsToSVGPath(this._points).join('');
    if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
      this.canvas.requestRenderAll();
      return;
    }

    const path = this.createPath(pathData);
    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.add(path);
    this.canvas.requestRenderAll();
    path.setCoords();
    this._resetShadow();

    this.canvas.fire('path:created', { path });
  },
});

export default Brush;
