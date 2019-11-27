import styled from 'styled-components';

const Div = styled.div`
  background-color: ${(props) => (props.order % 2 ? 'white' : '#EEEEEE')};
`;

export default Div;
