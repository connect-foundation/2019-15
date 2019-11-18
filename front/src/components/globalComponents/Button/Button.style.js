import styled from 'styled-components';

const ButtonStyle = styled.button`
  text-align: center;
  border: 1px solid #edeeec;
  border-radius: 1rem;
  width: 4rem;
  height: 2rem;
  color: #edeeec;
  font-size: 7px;
  background-color: ${(props) => props.theme.buttonColor};
  &:hover {
    background-color: #15062c;
    cursor: pointer;
  }
`;

export default ButtonStyle;
