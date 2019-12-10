import { useState } from 'react';

export default function useCarousel(maxValue) {
  const [index, setIndex] = useState(0);

  function clickLeftBtn() {
    if (index <= 0) {
      setIndex(maxValue - 1);
      return;
    }
    setIndex(index - 1);
  }

  function clickRightBtn() {
    if (index >= maxValue - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }

  return [index, clickLeftBtn, clickRightBtn];
}
