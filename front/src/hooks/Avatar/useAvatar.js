import { useEffect, useRef } from 'react';
import { makeScene } from 'logics/avatar';

export default function useAvatar(avatarIndex) {
  const avatarRef = useRef(null);
  useEffect(() => {
    makeScene(avatarRef, avatarIndex);

    return () => {
      avatarRef.current.removeChild(avatarRef.current.children[0]);
    };
  });
  return [avatarRef];
}
