import styled, { keyframes } from 'styled-components';

const friendsBtnBottom = 3;
const friendsBtnRight = 2;
const slideUp = keyframes`
    0% {
      opacity: 0;
      transform: translateY(1.6rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

export const FriendListStyle = styled.div`
  animation: ${slideUp} 0.15s ease 1;
  position: fixed;
  bottom: ${friendsBtnBottom + 5}rem;
  right: ${friendsBtnRight}rem;
  width: 9rem;
  height: auto;
  background-color: ${(props) => props.theme.pink};
`;

export const Div = styled.div`
  height: 20rem;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 9px;
    background: none;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.darkPink};
    opacity: 0.4;
  }
`;
