import styled from 'styled-components';

const MyInfoSectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 30%;
  background-color: ${(props) => props.theme.containerColor};
`;

export default MyInfoSectionStyle;
