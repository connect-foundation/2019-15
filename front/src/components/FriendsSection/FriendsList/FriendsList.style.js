import styled from 'styled-components';

const friendsBtnBottom = 3;
const friendsBtnRight = 2;

const FriendsListStyle = styled.div`
  position: fixed;
  display: ${(props) => props.isVisible};
  bottom: ${friendsBtnBottom + 3}rem;
  right: ${friendsBtnRight}rem;
  width: 8rem;
  height: auto;
  background-color: yellow;
`;

export default FriendsListStyle;
