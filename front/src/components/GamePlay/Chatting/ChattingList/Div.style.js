import styled from 'styled-components';

const Div = styled.div`
  background-color: ${(props) => (props.order % 2 ? 'white' : '#EEEEEE')};
  padding-left: 0.5rem;
  color: ${(props) =>
    props.privileged === 'notice'
      ? 'red'
      : props.privileged
      ? 'lightgray'
      : 'black'}};
`;

export default Div;
