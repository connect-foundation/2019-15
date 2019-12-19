import {
  faExclamationCircle,
  faFileExcel,
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
};

export default types;
