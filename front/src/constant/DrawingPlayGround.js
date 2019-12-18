export const DEFAULT_DRAWING_OPTIONS = {
  tool: 'pen',
  strokeColor: '#000000',
  strokeWidth: 10,
  fillColor: '#FFFFFF',
};

export const RGB_LIST = [
  '#000000',
  '#FF0000',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#FF00FF',
  '#C0C0C0',
  '#FFFFFF',
];

export const getOffset = (e) => {
  return {
    x: e.offsetX,
    y: e.offsetY,
  };
};

export const getMouseEvent = (event, options) => {
  return new MouseEvent(event, {
    bubbles: true,
    cancelable: true,
    view: window,
    ...options,
  });
};

export const DEFAULT_CIRCLE_OPTIONS = {
  originX: 'left',
  originY: 'center',
};

export const DEFAULT_ERASER_OPTIONS = {
  width: 50,
  color: '#FFFFFF',
};

export const DEFAULT_LINE_OPTIONS = {
  originX: 'center',
  originY: 'center',
};

export const getClientPointer = (elementOffset, eventOffset) => {
  return {
    clientX: elementOffset.left + eventOffset.x,
    clientY: elementOffset.top + eventOffset.y,
  };
};
