import styled from 'styled-components';

const AlertStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  > svg {
    color: ${(props) => props.theme.ecstasy};
  }
`;

export default AlertStyle;
