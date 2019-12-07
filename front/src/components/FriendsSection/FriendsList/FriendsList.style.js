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

const FriendsListStyle = styled.div`
  animation: ${slideUp} 0.15s ease 1;
  position: fixed;
  bottom: ${friendsBtnBottom + 5}rem;
  right: ${friendsBtnRight}rem;
  width: 9rem;
  height: auto;
  background-color: ${(props) => props.theme.pink};
`;

export default FriendsListStyle;
