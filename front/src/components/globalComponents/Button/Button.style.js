import styled from 'styled-components';

const ButtonStyle = styled.button`
  text-align: center;
  border: 0;
  border-radius: 1rem;
  width: 4rem;
  height: 2rem;
  color: ${(props) => props.theme.grayNurse};
  background-color: ${(props) => props.theme.mustard};
  &:hover {
    background-color: ${(props) => props.theme.wattle};
    cursor: pointer;
  }
`;

export default ButtonStyle;
