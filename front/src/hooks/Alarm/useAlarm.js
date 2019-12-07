import { useEffect, useContext, useReducer } from 'react';
import GlobalContext from 'global.context';
import { offRequestFriend, onRequestFriend } from 'logics/socketLogic/online';

const alarmListReducer = (state, action) => {
  switch (action.type) {
    case 'push':
      return [...state, action.value];
    case 'pop':
      state.pop();
      return [...state];
    case 'reset':
      return [];
    default:
      throw new Error('wrong action type');
  }
};

export default function useAlarm() {
  const { onlineSocket } = useContext(GlobalContext);

  const [alarmList, alarmListDispatch] = useReducer(alarmListReducer, []);

  useEffect(() => {
    if (onlineSocket) onRequestFriend(onlineSocket, alarmListDispatch);
    return () => {
      if (onlineSocket) offRequestFriend(onlineSocket);
    };
  }, [alarmListDispatch, onlineSocket]);

  return [alarmList, alarmListDispatch];
}
