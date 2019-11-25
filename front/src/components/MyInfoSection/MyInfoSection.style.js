import styled from 'styled-components';

const MyInfoSectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.containerColor};
`;

export default MyInfoSectionStyle;
