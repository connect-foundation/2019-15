import React, { useEffect } from 'react';
import useFabricCanvas from 'hooks/DrawingPlayGround/useFabricCanvas';
import PropTypes from 'prop-types';

Canvas.propTypes = {
  canvasDatas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      data: PropTypes.string,
    }),
  ),
  size: PropTypes.func,
  setRestart: PropTypes.func,
  speed: PropTypes.number,
};

Canvas.defaultProps = {
  canvasDatas: null,
  size: { width: 760, height: 470 },
  setRestart: null,
  speed: 1,
};

export default function Canvas({ canvasDatas, size, setRestart, speed }) {
  const [fabricCanvas, attachFabricCanvas] = useFabricCanvas(size);

  useEffect(() => {
    const setCanvasFromJson = (event) => {
      fabricCanvas.loadFromJSON(event);
      fabricCanvas.forEachObject((obj) => {
        obj.selectable = false;
        obj.evented = false;
      });
    };

    if (canvasDatas && fabricCanvas) {
      canvasDatas.forEach((e, idx) => {
        setTimeout(() => {
          const eventJSON = { version: '3.5.1', objects: JSON.parse(e.data) };
          setCanvasFromJson(eventJSON);
        }, 500 * speed * idx);
      });
      setRestart(false);
    }
  }, [canvasDatas, fabricCanvas, setRestart, speed]);

  return <canvas ref={attachFabricCanvas} />;
}
