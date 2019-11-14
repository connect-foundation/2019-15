import styled from 'styled-components';

const RoomContainerStyle = styled.div`
  width: 30rem;
  height: 25rem;
  background-color: ${(props) => props.theme.containerColor};
  margin: 10px;
`;

export default RoomContainerStyle;
