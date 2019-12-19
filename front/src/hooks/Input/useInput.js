import { useState } from 'react';

export default function useInput(text = '') {
  const [value, setValue] = useState(text);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange];
}
