import { useState } from 'react';

export default function useInput(initVal) {
  const initValue = initVal || '부스트캠퍼';
  const [value, setValue] = useState(initValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange];
}
