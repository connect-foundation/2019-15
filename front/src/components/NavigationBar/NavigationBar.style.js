import styled from 'styled-components';

const NavigationBarStyle = styled.div`
  display: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: ${(props) => props.theme.navigationBarColor};
`;

export default NavigationBarStyle;
