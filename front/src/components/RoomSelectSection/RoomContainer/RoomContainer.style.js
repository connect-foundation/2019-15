import styled from 'styled-components';

const RoomContainerStyle = styled.section`
  width: 30rem;
  height: 25rem;
  background-color: ${(props) => props.theme.scotchMist};
  margin: 10px;
  border-radius: 3rem;
  border: solid 0.5rem white;
`;

export default RoomContainerStyle;
