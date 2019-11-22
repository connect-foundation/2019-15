import styled from "styled-components";

const MyPageStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-color: ${(props) => props.theme.bodyColor};
`;

export default MyPageStyle;
