import styled from 'styled-components';

const Div = styled.div`
  background-color: ${(props) => (props.order % 2 ? 'white' : '#EEEEEE')};
  color: ${(props) =>
    props.privileged === 'notice'
      ? 'red'
      : props.privileged
      ? 'lightgray'
      : 'black'}};
`;

export default Div;
