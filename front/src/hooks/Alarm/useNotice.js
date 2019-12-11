import { useReducer } from 'react';

const noticeTypeReducer = (state, action) => {
  if (action.type === 'messages') {
    if (action.open) return { isOpen: true, type: 'messages' };
    return { isOpen: false, type: 'messages' };
  }

  if (!action.open) return { isOpen: false, type: action.type };

  if (state.isOpen) return state;
  if (!state.type) return { type: action.type };
  return { isOpen: true, type: action.type };
};

export default function useNotice() {
  const [notice, noticeDispatch] = useReducer(noticeTypeReducer, {
    isOpen: false,
    type: null,
  });

  return [notice, noticeDispatch];
}
