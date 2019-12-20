import {
  faExclamationCircle,
  faFileExcel,
  faUsers,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';

const types = {
  error: {
    message: '에러가 발생하였습니다.',
    icon: faExclamationCircle,
  },
  noData: {
    message: '내용이 없습니다.',
    icon: faFileExcel,
  },
  noFriend: {
    message: '친구를 추가해보세요!',
    icon: faUsers,
  },
  noAlarm: {
    message: '새로운 알림이 없습니다.',
    icon: faHistory,
  },
  noFriendRequest: {
    message: '새로운 친구요청이 없습니다.',
    icon: faHistory,
  },
  noGameHistory: {
    message: '게임 기록이 없습니다.',
    icon: faHistory,
  },
};

export default types;
