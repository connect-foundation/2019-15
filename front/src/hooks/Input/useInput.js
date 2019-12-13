import { useState } from 'react';

export default function useInput(text = '') {
  const [value, setValue] = useState(text);

  function onChange(e) {
    setValue(e.target.value);
  }

  return [value, onChange];
}
