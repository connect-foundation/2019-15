import styled, { keyframes } from 'styled-components';

const slideRight = keyframes`
    0% {
      opacity: 0;
      transform: translateX(-1.6rem);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
`;

export const NoticeStyle = styled.div`
  animation: ${slideRight} 0.15s ease 1;
  position: fixed;
  left: 1rem;
  top: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  opacity: 0.95;
  width: 20rem;
  height: 5rem;
  border-radius: 1rem;
  transition: all 1s ease;
`;

export const NotificationStyle = styled.div``;
