import { useRef, useEffect } from 'react';

export default function useCloseClicker(close) {
  const ref = useRef(null);

  useEffect(() => {
    const eventHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) close();
    };
    document.addEventListener('click', eventHandler);
    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, [close]);

  return ref;
}
