import { useReducer, useEffect } from 'react';
import useCanvasDataEmit from 'hooks/DrawingPlayGround/useCanvasDataEmit';

const eventListReducer = (state, action) => {
  switch (action.type) {
    case 'push':
      return [...state, action.value];
    case 'pop':
      state.pop();
      return [...state];
    case 'reset':
      return [];
    default:
      throw new Error();
  }
};

export default function useCanvasDataCaching() {
  const [eventList, eventListDispatch] = useReducer(eventListReducer, []);
  const emitCanvasData = useCanvasDataEmit();

  useEffect(() => {
    const emitCanvasDataInterval = setInterval(() => {
      if (!eventList.length) return;
      emitCanvasData(eventList);
      eventListDispatch({ type: 'reset' });
    }, 2);
    return () => {
      clearInterval(emitCanvasDataInterval);
    };
  }, [emitCanvasData, eventList]);

  return eventListDispatch;
}
