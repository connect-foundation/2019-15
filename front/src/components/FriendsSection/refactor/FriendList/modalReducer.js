const modalReducer = (state, action) => {
  switch (action.type) {
    case 'clear':
      return { ...state, content: null };
    case 'deleteRequest':
      return {
        content: `${action.nickname}님을 삭제하시겠습니까?`,
        nickname: action.nickname,
        current: 'deleteRequest',
      };
    case 'deleteDone':
      return {
        ...state,
        content: `${action.nickname}님이 삭제되었습니다.`,
        current: 'deleteDone',
      };
    case 'addRequest':
      if (!action.nickname)
        return { ...state, content: '친구의 닉네임을 입력해주세요' };
      return {
        content: `${action.nickname}님을 추가하시겠습니까?`,
        nickname: action.nickname,
        current: 'addRequest',
      };
    case 'addDone':
      return {
        ...state,
        content: `${action.nickname}님에게 요청이 전달되었습니다.`,
        current: 'addDone',
      };
    default:
      throw new Error(`${action.type} is wrong action type`);
  }
};

export default modalReducer;
