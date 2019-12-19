import { useReducer } from 'react';

const nicknameReducer = (state, action) => {
  switch (action.type) {
    case 'nickname': {
      state.nickname = action.nickname;
      return state;
    }
    default:
      throw new Error();
  }
};

const initialInfo = {
  nickname: '부스트캠퍼',
};

export default function useInputByReducer() {
  const [userNickname, userNicknameDispatch] = useReducer(
    nicknameReducer,
    initialInfo,
  );

  const onChangeNick = (e) => {
    userNicknameDispatch({ type: 'nickname', nickname: e.target.value });
  };
  return [userNickname, onChangeNick];
}
