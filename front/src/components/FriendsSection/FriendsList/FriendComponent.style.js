import styled from 'styled-components';

const FriendComponentStyle = styled.div`
  display: flex;
  width: 7rem;
  height: 1rem;
  background-color: ${(props) => props.theme.pink};
  color: black;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  font-size: 17px;
`;

export default FriendComponentStyle;
