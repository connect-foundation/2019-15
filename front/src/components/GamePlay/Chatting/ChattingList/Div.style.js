import styled from 'styled-components';

const Div = styled.div`
  background-color: ${(props) => (props.order % 2 ? 'white' : '#EEEEEE')};
  padding-left: 0.5rem;
  color: ${(props) => {
    if (props.privileged === 'notice') return 'red';
    if (props.privileged) return 'lightgray';
    return 'black';
  }};
`;

export default Div;
