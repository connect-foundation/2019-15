import styled from 'styled-components';

const MainPageStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${(props) => props.theme.bodyColor};
`;

export default MainPageStyle;
