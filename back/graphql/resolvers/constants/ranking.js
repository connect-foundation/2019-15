module.exports = {
  MAX_INT: 2147483647,
  MIN_ID: 0,
  CURSOR_LENGTH: 20,
  MAX_CURSOR: '99999999999999999999',
  MIN_CURSOR: '00000000000000000000',
  intTo10Str: (int) => {
    return int.toString().padStart(10, '0');
  },
  strToInt: (str) => {
    return parseInt(str, 10);
  },
};
