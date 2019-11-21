import styled from 'styled-components';

const RoomContainerStyle = styled.div`
  width: 30rem;
  height: 25rem;
  background-color: ${(props) => props.theme.containerColor};
  margin: 10px;
  border-radius: 0.3rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export default RoomContainerStyle;
