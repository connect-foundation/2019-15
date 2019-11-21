import styled from 'styled-components';

const ButtonStyle = styled.button`
  text-align: center;
  border: 0;
  border-radius: 1rem;
  width: 4rem;
  height: 2rem;
  color: ${(props) => props.theme.grayNurse};
  background-color: ${(props) => props.theme.brightGray};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background-color: #15062c;
    cursor: pointer;
  }
`;

export default ButtonStyle;
