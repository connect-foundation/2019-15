import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { faRedo, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import {
  DoIconStyle,
  HistoryStyle,
} from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterBoard/History/History.style';
import { fabric } from 'fabric';
import Recorder from 'components/GamePlay/CanvasSection/DrawingPlayGround/PainterPlayGround/PainterBoard/History/Recorder';
import useCanvasDataEmitWithCaching from 'hooks/DrawingPlayGround/useCanvasDataEmitWithCaching';

History.propTypes = {
  fabricCanvas: PropTypes.instanceOf(fabric.Canvas),
};

History.defaultProps = {
  fabricCanvas: null,
};

export default function History({ fabricCanvas }) {
  const eventListDispatch = useCanvasDataEmitWithCaching();
  const recorder = useRef(new Recorder());
  useEffect(() => {
    if (!fabricCanvas) return () => {};

    const dispatchEventByEventName = (eventName) => {
      eventListDispatch({
        type: 'push',
        value: {
          data: fabricCanvas.toJSON(),
          event: eventName,
        },
      });
    };
    const addObject = ({ target }) => {
      recorder.current.addDo(target);
      dispatchEventByEventName('objectAdded');
    };
    const removeObject = () => {
      dispatchEventByEventName('objectRemoved');
    };
    const clearCanvas = () => {
      dispatchEventByEventName('objectsCleared');
    };

    fabricCanvas.on('object:added', addObject);
    fabricCanvas.on('object:removed', removeObject);
    fabricCanvas.on('canvas:cleared', clearCanvas);
    return () => {
      fabricCanvas.off('object:added', addObject);
      fabricCanvas.off('object:removed', removeObject);
      fabricCanvas.off('canvas:cleared', clearCanvas);
    };
  }, [eventListDispatch, fabricCanvas, recorder]);

  const undo = () => {
    const obj = recorder.current.undo();
    if (obj) fabricCanvas.remove(obj);
  };

  const redo = () => {
    const obj = recorder.current.redo();
    if (obj) fabricCanvas.add(obj);
  };

  const reset = () => {
    fabricCanvas.clear();
    recorder.current.clear();
  };
  return (
    <HistoryStyle>
      {fabricCanvas ? (
        <>
          <DoIconStyle icon={faUndo} onClick={undo} />
          <DoIconStyle icon={faRedo} onClick={redo} />
          <DoIconStyle icon={faTrash} onClick={reset} />
        </>
      ) : null}
    </HistoryStyle>
  );
}
