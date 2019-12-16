import { useEffect, useContext, useReducer } from 'react';
import GlobalContext from 'global.context';
import { offAlarm, onAlarm } from 'logics/socketLogic/online';
import uuidv4 from 'uuid/v4';

const alarmReducer = (state, action) => {
  switch (action.type) {
    case 'push':
      return { ...state, ...action.value };
    case 'pop': {
      const { [action.value]: val, ...rest } = state;
      return rest;
    }
    case 'reset':
      return {};
    default:
      throw new Error(`${action.type} is wrong action type`);
  }
};

export default function useAlarm() {
  const { onlineSocket } = useContext(GlobalContext);

  const [alarm, alarmDispatch] = useReducer(alarmReducer, {});

  useEffect(() => {
    if (!onlineSocket) return () => {};
    onAlarm(onlineSocket, (message) => {
      const id = uuidv4();
      alarmDispatch({
        type: 'push',
        value: {
          [id]: message,
        },
      });

      setTimeout(() => {
        alarmDispatch({
          type: 'pop',
          value: id,
        });
      }, 2000);
    });
    return () => {
      if (onlineSocket) offAlarm(onlineSocket);
    };
  }, [onlineSocket]);

  return [alarm, alarmDispatch];
}
