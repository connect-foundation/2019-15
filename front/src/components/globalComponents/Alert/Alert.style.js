import styled from 'styled-components';

const AlertStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin: 1rem;
  > svg {
    color: ${(props) => props.theme.mustard};
  }
`;

export default AlertStyle;
