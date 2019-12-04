import styled from 'styled-components';

const ButtonStyle = styled.button`
  text-align: center;
  border: 0;
  border-radius: 1rem;
  width: 4rem;
  height: 2rem;
  background-color: ${(props) => props.theme.pink};
  &:hover {
    background-color: ${(props) => props.theme.seaPink};
    cursor: pointer;
  }
`;

export default ButtonStyle;
