import styled from 'styled-components';

const ButtonStyle = styled.button`
  text-align: center;
  border: 0;
  border-radius: 1rem;
  width: 4rem;
  height: 2rem;
  color: ${(props) => props.theme.bodyColor};
  background-color: ${(props) => props.theme.buttonColor};
  &:hover {
    background-color: #15062c;
    cursor: pointer;
  }
`;

export default ButtonStyle;
